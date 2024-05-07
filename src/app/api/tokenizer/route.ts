// @ts-nocheck
import Midtrans from 'midtrans-client'
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

let snap = new Midtrans.Snap({
  isProduction : false,
  serverKey : process.env.SECRET_KEY,
  clientKey : process.env.NEXT_PUBLIC_CLIENT_KEY
})

export async function POST(request : NextRequest) {
  const cookiesStore = cookies()
  const body = await request.json()
  const data = body.orders
  const dataLength = body.orders.length
  const itemsIDs = data.map(item => item.id)
  let token = ""

  // cek is the court unbooked
  const statuses = await prisma.playtime.findMany({
    where :{
      id :{
        in : itemsIDs
      },
    },
    select : {
      id : true,
      status : true,
      start : true,
      end : true,
      date : true,
      court : true
    }
  })

  const statusCheck = statuses.every((item) => item.status === 1)
  if(!statusCheck){
    const statusNotOneIds = statuses.filter((item) => item.status !== 1)
    return NextResponse.json({message : "Found some item isBooked!", data : statusNotOneIds, token : ""})
  }else{
    // if all court is unbooked
    await prisma.playtime.updateMany({
      where : {
        id : {
          in: itemsIDs
        },
      },
      data:{
        status : 4
      }
    })
  
    // made order and book
    const userID = cookiesStore.get("id")?.value
    const ordersPlacement = await prisma.order.create({
      data:{
        items : itemsIDs,
        orderStatus : 'pending',
        books : {
          createMany : {
            data : data.map(item => ({
              date : item.date,
              court : item.court,
              start : item.start,
              end : item.end,
              startHour : item.startHour,
              status : true,
              usernameID : userID,
            }))
          }
        }
      }
    })
    console.log(ordersPlacement)
    if(ordersPlacement){
      let parameter = {
        customer_details : {
          user_id : cookiesStore.get("id").value,
          username : cookiesStore.get("username").value,
          phone : cookiesStore.get("phone").value
        },
        transaction_details :{
          order_id : ordersPlacement.id,
          gross_amount : dataLength * 20000 //statis price
        }
      }
      token = await snap.createTransactionToken(parameter)
    }
  }
  return NextResponse.json({message : "Order successfully added!", token : token})
}
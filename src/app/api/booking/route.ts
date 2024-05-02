import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient()

const convertToISOSting = (obj : String) =>{
  const year:number = parseInt(obj.split(",")[0].split("/")[2])
  const month:number = parseInt(obj.split(",")[0].split("/")[0]) - 1
  const day:number = parseInt(obj.split(",")[0].split("/")[1])

  const newDate = new Date(year, month, day, 8, 0, 0)
  return newDate.toISOString()
}

export async function GET(request : NextRequest) {
  const date = new Date()
  const curentDate = convertToISOSting(date.toLocaleString('en-US', {timeZone: 'Asia/Makassar', hour12:false}))
  const maxDay = new Date()
  maxDay.setDate(maxDay.getDate() + 7)
  const curentMaxDay = convertToISOSting(maxDay.toLocaleString('en-US', {timeZone: 'Asia/Makassar', hour12:false}))
  console.log(curentDate)
  console.log(curentMaxDay)

  const datas = await prisma.dateList.findMany({
    where : {
      status : true,
      AND : [
        {date : {gte : curentDate}},
        {date : {lt : curentMaxDay}}
      ]
    },
    select : {
      date : true,
      courts : {
        select : {
          name : true,
          date : true,
          playTime : {
            select : {
              id : true,
              start : true,
              end : true,
              startHour : true,
              date : true,
              status : true
            }
          }
        }
      }
    }
  })
  // console.log(datas)
  return NextResponse.json({message : "Date successfully fetched", data : datas})
}

export async function POST(request : NextRequest) {
  const cookiesStore = cookies()
  const userID = cookiesStore.get("id")
  const body = await request.json()
  const dataLength = body.orders.length

  for (let i = 0; i < dataLength; i++) {
    const order = body.orders[i];
    await prisma.book.create({
      data : {
        date : order.date,
        court : order.court,
        start : order.start,
        end : order.end,
        startHour : order.startHour,
        status : true,
        usernameID : userID!.value,
      }
    })
    await prisma.playtime.update({
      where : { id : order.id },
      data : { status : 2 }
    })
  }

  return NextResponse.json({message : "Order successfully added!"})
}
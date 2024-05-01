import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient()

export async function GET(request : NextRequest) {
  const curentDate = new Date()
  const maxDay = new Date()
  maxDay.setDate(curentDate.getDate() + 7)
  const datas = await prisma.dateList.findMany({
    where : {
      status : true,
      AND : [
        {date : {gte : curentDate}},
        {date : {lt : maxDay}}
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

  return NextResponse.json({message : "Halo"})
}
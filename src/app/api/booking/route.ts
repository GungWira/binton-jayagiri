import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient()

export async function GET(request : NextRequest) {
  const curentDate = new Date()
  const maxDay = new Date()
  maxDay.setDate(curentDate.getDate() + 7)

  const dataCount = await prisma.dateList.count({
    where : {
      AND : [
        {date : {gte : curentDate}},
        {date : {lt : maxDay}}
      ]
    }
  })

  if(dataCount !== 7){
    // if no
    const gapDate = 7 - dataCount
    for(let i = 1; i <= gapDate; i++){
      const newDate = new Date()
      newDate.setDate(curentDate.getDate() + dataCount + i)
      await prisma.dateList.create({
        data : {
          date : newDate,
          status : true,
          courts : {
            create : [
              {
                name : "A",
                playTime : {
                  createMany : {
                    data : [
                      {start : "08.00", end : "09.00", status : true},
                      {start : "09.00", end : "10.00", status : true},
                      {start : "10.00", end : "11.00", status : true},
                      {start : "11.00", end : "12.00", status : true},
                      {start : "12.00", end : "13.00", status : true},
                      {start : "13.00", end : "14.00", status : true},
                      {start : "14.00", end : "15.00", status : true},
                      {start : "15.00", end : "16.00", status : true},
                      {start : "16.00", end : "17.00", status : true},
                      {start : "17.00", end : "18.00", status : true},
                      {start : "18.00", end : "19.00", status : true},
                      {start : "19.00", end : "20.00", status : true},
                    ]
                  }
                }
              },
              {
                name : "B",
                playTime : {
                  createMany : {
                    data : [
                      {start : "08.00", end : "09.00", status : true},
                      {start : "09.00", end : "10.00", status : true},
                      {start : "10.00", end : "11.00", status : true},
                      {start : "11.00", end : "12.00", status : true},
                      {start : "12.00", end : "13.00", status : true},
                      {start : "13.00", end : "14.00", status : true},
                      {start : "14.00", end : "15.00", status : true},
                      {start : "15.00", end : "16.00", status : true},
                      {start : "16.00", end : "17.00", status : true},
                      {start : "17.00", end : "18.00", status : true},
                      {start : "18.00", end : "19.00", status : true},
                      {start : "19.00", end : "20.00", status : true},
                    ]
                  }
                }
              },
              {
                name : "C",
                playTime : {
                  createMany : {
                    data : [
                      {start : "08.00", end : "09.00", status : true},
                      {start : "09.00", end : "10.00", status : true},
                      {start : "10.00", end : "11.00", status : true},
                      {start : "11.00", end : "12.00", status : true},
                      {start : "12.00", end : "13.00", status : true},
                      {start : "13.00", end : "14.00", status : true},
                      {start : "14.00", end : "15.00", status : true},
                      {start : "15.00", end : "16.00", status : true},
                      {start : "16.00", end : "17.00", status : true},
                      {start : "17.00", end : "18.00", status : true},
                      {start : "18.00", end : "19.00", status : true},
                      {start : "19.00", end : "20.00", status : true},
                    ]
                  }
                }
              }
            ]
          }
        }
      })
    }
  }
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
  console.log(userID)
  const body = await request.json()
  console.log(body.orders.length)
  const dataLength = body.orders.length
  for (let i = 0; i < dataLength; i++) {
    const order = body.orders[i];
    await prisma.book.create({
      data : {
        date : order.date,
        court : order.court,
        start : order.start,
        end : order.end,
        status : true,
        usernameID : userID?.value
      }
    })
    await prisma.playtime.update({
      where : { id : order.id },
      data : { status : false }
    })
  }

  return NextResponse.json({message : "Halo"})
}
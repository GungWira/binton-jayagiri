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
                      {start : "08.00", end : "09.00", status : 1, date: newDate, startHour:8},
                      {start : "09.00", end : "10.00", status : 1, date: newDate, startHour:9},
                      {start : "10.00", end : "11.00", status : 1, date: newDate, startHour:10},
                      {start : "11.00", end : "12.00", status : 1, date: newDate, startHour:11},
                      {start : "12.00", end : "13.00", status : 1, date: newDate, startHour:12},
                      {start : "13.00", end : "14.00", status : 1, date: newDate, startHour:13},
                      {start : "14.00", end : "15.00", status : 1, date: newDate, startHour:14},
                      {start : "15.00", end : "16.00", status : 1, date: newDate, startHour:15},
                      {start : "16.00", end : "17.00", status : 1, date: newDate, startHour:16},
                      {start : "17.00", end : "18.00", status : 1, date: newDate, startHour:17},
                      {start : "18.00", end : "19.00", status : 1, date: newDate, startHour:18},
                      {start : "19.00", end : "20.00", status : 1, date: newDate, startHour:19},
                    ]
                  }
                }
              },
              {
                name : "B",
                playTime : {
                  createMany : {
                    data : [
                      {start : "08.00", end : "09.00", status : 1, date: newDate, startHour:8},
                      {start : "09.00", end : "10.00", status : 1, date: newDate, startHour:9},
                      {start : "10.00", end : "11.00", status : 1, date: newDate, startHour:10},
                      {start : "11.00", end : "12.00", status : 1, date: newDate, startHour:11},
                      {start : "12.00", end : "13.00", status : 1, date: newDate, startHour:12},
                      {start : "13.00", end : "14.00", status : 1, date: newDate, startHour:13},
                      {start : "14.00", end : "15.00", status : 1, date: newDate, startHour:14},
                      {start : "15.00", end : "16.00", status : 1, date: newDate, startHour:15},
                      {start : "16.00", end : "17.00", status : 1, date: newDate, startHour:16},
                      {start : "17.00", end : "18.00", status : 1, date: newDate, startHour:17},
                      {start : "18.00", end : "19.00", status : 1, date: newDate, startHour:18},
                      {start : "19.00", end : "20.00", status : 1, date: newDate, startHour:19},
                    ]
                  }
                }
              },
              {
                name : "C",
                playTime : {
                  createMany : {
                    data : [
                      {start : "08.00", end : "09.00", status : 1, date: newDate, startHour:8},
                      {start : "09.00", end : "10.00", status : 1, date: newDate, startHour:9},
                      {start : "10.00", end : "11.00", status : 1, date: newDate, startHour:10},
                      {start : "11.00", end : "12.00", status : 1, date: newDate, startHour:11},
                      {start : "12.00", end : "13.00", status : 1, date: newDate, startHour:12},
                      {start : "13.00", end : "14.00", status : 1, date: newDate, startHour:13},
                      {start : "14.00", end : "15.00", status : 1, date: newDate, startHour:14},
                      {start : "15.00", end : "16.00", status : 1, date: newDate, startHour:15},
                      {start : "16.00", end : "17.00", status : 1, date: newDate, startHour:16},
                      {start : "17.00", end : "18.00", status : 1, date: newDate, startHour:17},
                      {start : "18.00", end : "19.00", status : 1, date: newDate, startHour:18},
                      {start : "19.00", end : "20.00", status : 1, date: newDate, startHour:19},
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
  // update data based time
  const updateDataBaseTime = async () =>{
    const curentHourTime = parseInt(curentDate.toLocaleString('id-ID', {timeZone: 'Asia/Makassar'}).split(" ")[1].split(".")[0])
    const tomorowDate = new Date()
    tomorowDate.setDate(curentDate.getDate() + 1)
    await prisma.playtime.updateMany({
      where: {
        date : {gte : curentDate, lt: tomorowDate},
        AND : {
          startHour : {lte : curentHourTime}
        }
      },
      data :{
        status : 0
      }
    })
  }
  updateDataBaseTime()
  // fecth final data
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
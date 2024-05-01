import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

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
  updateDataBaseTime()
  return NextResponse.json({message : "Data ready to serve!", serve: true}, {status:200})
}
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

const convertToISOSting = (obj : String) =>{
  const year:number = parseInt(obj.split(",")[0].split("/")[2])
  const month:number = parseInt(obj.split(",")[0].split("/")[0]) - 1
  const day:number = parseInt(obj.split(",")[0].split("/")[1])

  const newDate = new Date(year, month, day, 8, 0, 0)
  return newDate.toISOString()
}

export async function POST(request:NextRequest) {
  const body = await request.json()
  const date = new Date()
  const curentDate = convertToISOSting(date.toLocaleString('en-US', {timeZone: 'Asia/Makassar', hour12:false}))
  // update data based time
  const updateDataBaseTime = async () =>{
    const curentHourTime = parseInt(date.toLocaleString('id-ID', {timeZone: 'Asia/Makassar'}).split(" ")[1].split(".")[0])
    const tomorowDate = new Date()
    tomorowDate.setDate(date.getDate() + 1)
    const curentTomorrowDate = convertToISOSting(tomorowDate.toLocaleString('en-US', {timeZone: 'Asia/Makassar', hour12:false}))
    await prisma.book.updateMany({
      where: {
        date : {gte : curentDate, lt: curentTomorrowDate},
        AND : {
          startHour : {lte : curentHourTime}
        }
      },
      data :{
        status : false
      }
    })
  }
  updateDataBaseTime()
  try {
    const data = await prisma.book.findMany({
      where : {
        usernameID : body.usernameID,
        status : true
      },
      include:{
        orderStatus : true
      }
    });
    return NextResponse.json({message: "Data founded", data: data})
  } catch (error) {
    console.log(error)
  }
}
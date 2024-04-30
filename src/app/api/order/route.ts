import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(request:NextRequest) {
  const body = await request.json()
  const curentDate = new Date()
  // update data based time
  const updateDataBaseTime = async () =>{
    const curentHourTime = parseInt(curentDate.toLocaleString('id-ID', {timeZone: 'Asia/Makassar'}).split(" ")[1].split(".")[0])
    const tomorowDate = new Date()
    tomorowDate.setDate(curentDate.getDate() + 1)
    await prisma.book.updateMany({
      where: {
        date : {gte : curentDate, lt: tomorowDate},
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
        AND: {
          status : true
        }
      }
    })
    return NextResponse.json({message: "Data founded", data: data})
  } catch (error) {
    
  }
}
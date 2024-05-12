import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/libs/jwt";

const prisma = new PrismaClient()

export async function POST(request:NextRequest) {
  const body = await request.json()
  const {auth} = body
  const verify = verifyToken(auth)
  if(verify === null) return NextResponse.json({message : "Invalid Auth", data:null})
  const data = await prisma.order.findMany({
    where : {
      usernameID : verify.id,
    },
    include : {
      books : true
    }
  })
  const validData = data.reverse()
  return NextResponse.json({message : "Data founded", data : validData})
}
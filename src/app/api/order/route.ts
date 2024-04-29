import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(request:NextRequest) {
  const body = await request.json()
  try {
    const data = await prisma.book.findMany({
      where : {
        usernameID : body.usernameID
      }
    })
    return NextResponse.json({message: "Data founded", data: data})
  } catch (error) {
    
  }
}
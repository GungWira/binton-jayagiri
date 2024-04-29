import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient()

export async function POST(request : NextRequest) {
  const body = await request.json()
  const {username, phone} = body
  // check is user exist
  const result = await prisma.user.findUnique({
    where : {
      phone
    },
    select:{
      id : true,
      username : true,
      phone : true,
      books : {
        select:{
          id : true,
          date : true,
          court : true
        }
      }
    }
  })
  // if exist, check username validation
  if(result){
    // if valid
    if(result.username === username){
      // return ke halaman login
      cookies().set('username', result.username)
      cookies().set('phone', result.phone)
      cookies().set('id', result.id)
      return NextResponse.json({message: "Valid username", data : result})
    }
    // if invalid
    return NextResponse.json({message: "Invalid username"}, {status : 400})
  }
  // if not exist, cretae new user
  const post = await prisma.user.create({
    data : {
      username,
      phone,
    }
  })
  cookies().set('username', post.username)
  cookies().set('phone', post.phone)
  cookies().set('id', post.id)
  return NextResponse.json({message: "User created successfully", data : post})
}
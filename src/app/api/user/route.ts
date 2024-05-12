import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { createToken, verifyToken } from "@/libs/jwt";

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
        select : {
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
      const token = createToken({ id : result.id, username: result.username, phone : result.phone})
      cookies().set('auth', token, {httpOnly : true, maxAge : 60*60, secure : true})
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
  const token = createToken({ id : post.id, username: post.username, phone : post.phone})
  cookies().set('auth', token, {httpOnly : true, maxAge : 60*60, secure : true})
  return NextResponse.json({message: "User created successfully", data : post})
}
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request : NextRequest){
  if(request.method === 'OPTIONS'){
    const res = NextResponse.next() 
    res.headers.set('Access-Control-Allow-Credentials', 'true')
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
    return res
  }else{
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/:path*',
}
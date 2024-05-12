"use client"

import Image from "next/image";
import Badminton from "../../../../../public/badminton-4.svg"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage(){
  const router = useRouter()
  const [countdown, setCountdown] = useState(8);
  
  // if(!cookies().get('auth')){
  //   router.push('/')
  // }
  const backToOrder = () =>{
    console.log("pp")
    router.push("/order")
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }else{
        console.log("ok")
        backToOrder()
      }
    }, 1000);

    return () => {
      clearTimeout(timer)
    };
  }, [countdown]);
  return(
    <>
      <section className="w-full flex flex-col justify-center items-center gap-2 p-6 h-screen">
        <Image src={Badminton} alt="Badminton Success" className="mb-4"/>
        <p className="text-[#434343] text-lg font-bold text-center">Pembayaran Gagal</p>
        <p className="text-[#434343] text-xs font-light text-center">Maaf pembayaran Anda gagal, mohon coba beberapa saat lagi atau hubungi Admin untuk informasi lebih lanjut!</p>
        <p className="text-[#434343] text-xs font-light text-center mt-4">Kembali ke dashboard dalam : {countdown} detik</p>
      </section>
    </>
  )
}
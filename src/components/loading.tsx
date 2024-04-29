"use client"

import Image from "next/image"
import Logo from "../../public/Logo.svg"
import { useEffect } from "react"

export default function Loading(){
  useEffect(() =>{
    setTimeout(() => {
      document.querySelector(".loading").style.transform = "translateY(-100vh)"
    }, 3000);
  }, [])
  return (
    <section className="loading bg-[#ffffff] fixed container max-w-md h-screen flex flex-row justify-center items-center gap-x-2" style={{transition: "1.5s all ease-in-out", zIndex: "10"}}>
      <Image src={Logo} alt="Logo Binton Jayagiri"/>
      <p className="font-extrabold text-xl text-[#434343]">Binton Jayagiri</p>
    </section>
  )
}
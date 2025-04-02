"use client";

import Image from "next/image";
import Logo from "../../public/Logo.svg";
import { useEffect, useRef } from "react";

export default function Loading({ serve }: { serve: boolean }) {
  const loadingRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (serve) {
      setTimeout(() => {
        if (loadingRef.current) {
          loadingRef.current.style.transform = "translateY(-100vh)";
        }
      }, 1000);
    }
  }, []);
  return (
    <section
      ref={loadingRef}
      className="loading bg-[#ffffff] fixed container max-w-md h-screen flex flex-row justify-center items-center gap-x-2"
      style={{ transition: "1.5s all ease-in-out", zIndex: "10" }}
    >
      <Image src={Logo} alt="Logo Binton Jayagiri" />
      <p className="font-extrabold text-xl text-[#434343]">Binton Jayagiri</p>
    </section>
  );
}

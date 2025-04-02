"use client";

import Image from "next/image";
import Badminton from "../../public/badminton-1.svg";
import Kock from "../../public/shuttle.svg";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Loadingbar from "./loadingbar";

export default function Login() {
  const router = useRouter();
  const [username, setuserName] = useState("");
  const [phone, setPhone] = useState("");
  const notifRef = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStart(true);
    if (username.trim() !== "" && phone.trim() !== "") {
      const result = await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ username, phone }),
      });
      console.log(result.ok);
      if (result.ok) {
        router.refresh();
        setuserName("");
        setPhone("");
      } else {
        if (notifRef.current) {
          notifRef.current.style.transform = "translateY(0%)";
          handlerInvalid();
        }
      }
    }
  };

  const handlerInvalid = () => {
    setTimeout(() => {
      if (notifRef.current) {
        notifRef.current.style.transform = "translateY(-200%)";
      }
    }, 4000);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-2 justify-between items-center max-w-md h-screen p-6 pt-20 relative"
      >
        <div className="flex flex-col justify-center items-center w-full gap-y-2">
          <Image alt="Badminton" src={Badminton} className="my-10" />
          <p className="font-normal text-sm text-[#434343] opacity-60">
            Selamat datang di Binton Jayagiri
          </p>
          <p className="font-extrabold text-xl text-[#434343]">
            Silahkan isi data diri berikut
          </p>
          <input
            onChange={(e) => {
              setuserName(e.target.value);
            }}
            value={username}
            type="text"
            placeholder="Nama anda"
            required
            autoFocus
            className="w-full p-3 px-4 font-normal text-sm color-[#434343] outline-0 drop-shadow-sm"
          />
          <input
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            type="number"
            placeholder="Nomor telepon anda"
            required
            className="w-full p-3 px-4 font-normal text-sm color-[#434343] outline-0 drop-shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="flex flex-row justify-between w-full bg-[#0EAF7D] py-2 px-6 rounded-full items-center justify-self-end self-end"
        >
          <div className="flex flex-col justify-center items-start">
            <p className="font-bold text-sm text-[#ffffff]">Lanjutkan</p>
            <p className="font-ligth text-xs text-[#ffffff]">
              Menuju halaman pemesanan
            </p>
          </div>
          <Image src={Kock} alt="Kock" />
        </button>
      </form>
      <section
        ref={notifRef}
        className="notif w-full p-6 py-8 absolute top-0 left-0"
        style={{ transition: "1s ease-in-out", transform: "translateY(-200%)" }}
      >
        <div
          className="bg-[#ffffff] w-full p-4 rounded-md flex flex-col gap-2"
          style={{
            filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.05))",
            zIndex: 9,
          }}
        >
          <p className="font-bold text-base text-[#434343]">Invalid login</p>
          <p className="font-ligth text-xs text-[#434343]">
            Username atau nomor telp tidak valid, mohon coba lagi
          </p>
        </div>
      </section>
      <Loadingbar start={start} />
    </>
  );
}

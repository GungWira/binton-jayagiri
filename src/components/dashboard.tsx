import Image from "next/image";
import Header from "./header";
import Badminton from "../../public/badminton-2.svg"
import Link from "next/link";

export default function Dashboard(){
  return (
    <section className="p-6">
      <Header/>
      <div className="flex flex-col justify-center items-center w-full mt-8">
        <Image src={Badminton} alt="Badminton" className="mb-4"/> 
        <p className="font-ligth text-xs text-[#434343]">Welcome back!</p>
        <p className="font-bold text-lg text-[#434343]">Mau ngapain hari ini?</p>
        <div className="flex flex-row w-full justify-between gap-4 mt-4">
          <Link href={"/booking"} className="flex flex-1 border rounded-full py-2 justify-center items-center font-ligth text-xs text-[#434343] border-[#D9F1EA]">Booking Lapangan</Link>
          <Link href={"/order"} className="flex flex-1 border rounded-full py-2 justify-center items-center font-ligth text-xs text-[#434343] border-[#D9F1EA]">Cek Order Lapangan</Link>
        </div>
      </div>

    </section>
  )
}
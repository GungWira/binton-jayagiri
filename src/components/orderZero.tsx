import Image from "next/image";
import Badminton from "../../public/badminton-5.svg"
import Link from "next/link";

export default function OrderZero(){
  return(
    <>
      <section className="">
        <div className="flex flex-col w-full">
          <p className="font-bold text-md text-[#434343]">Order Lapangan</p>
          <p className="font-ligth text-xs text-[#434343]">Yah kamu belum punya order lapangan nih!</p>
        </div>
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <Image src={Badminton} alt="Badminton"/>
          <p className="font-ligth text-xs text-[#434343] mt-4">Booking lapangan pertamamu sekarang juga!</p>
          <Link href={"booking"} className="flex border rounded-full py-2 px-6 mt-4 justify-center items-center font-ligth text-xs text-[#434343] border-[#D9F1EA]">Booking Sekarang</Link>
        </div>
      </section>
    </>
  )
}
import Image from "next/image"
import Link from "next/link"
import Badminton from "../../public/badminton-1.svg"


export default function CartPageZero(){
  return (
    <>
      <section className="">
        <div className="flex flex-col w-full">
          <p className="font-bold text-md text-[#434343]">Keranjang Belanja</p>
          <p className="font-ligth text-xs text-[#434343]">Gawat! Keranjang kamu masih kosong nih!</p>
        </div>
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <Image src={Badminton} alt="Badminton"/>
          <p className="font-ligth text-xs text-[#434343] mt-4">Buat pesanan pertamamu sekarang juga!</p>
          <Link href={"booking"} className="flex border rounded-full py-2 px-6 mt-4 justify-center items-center font-ligth text-xs text-[#434343] border-[#D9F1EA]">Booking Sekarang</Link>
        </div>
      </section>
    </>
  )
}
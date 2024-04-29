"use client"

import Image from "next/image"
import Kock from "../../public/shuttle.svg"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


type Order = {
  id : String,
  date : Date,
  court : String,
  start : String,
  end : String,
}

export default function CourtTable({data} : {data : any}, {handler} : {handler : any}){
  const [orders, setOrders] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const courts = data.courts
  const router = useRouter()

  const orderHandler = (book : Order) => {
    const isOrdered = orders.some(order => order.id === book.id)
    if(isOrdered){
      setOrders(prevOrders => prevOrders.filter(order => order.id !== book.id))
    }else{
      setOrders(prevOrders => [...prevOrders, book])
    }
  }
  const handleOpenOrder = () =>{
    isOpen ?
    setIsOpen(false)
    :
    setIsOpen(true)
  }

  const handlerOrder = async () =>{
    if(orders.length !== 0){
      const post = await fetch("http://localhost:3000/api/booking", {
        method : "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({orders})
      })
      if(post.ok){
        setIsOpen(false)
        setOrders([])
        router.refresh()
      }else{
        console.log("no")
      }
    }
  }

  useEffect(() =>{
    const section = document.querySelector(".sectionOrder")

    if(isOpen){
      if(orders.length === 0){
        section.style.transform = "translateY(100%)"
        setIsOpen(false)
      }else{
        section.style.transform = "translateY(0%)"
      }
    }else{
      section.style.transform = "translateY(100%)"
    }
  }, [orders, isOpen])

  useEffect(() => {
    if (orders.length === 0){
      document.querySelector(".checkoutBtn").style.transform = "translateY(200%)"
    }else{
      document.querySelector(".checkoutBtn").style.transform = "translateY(0%)"
    }
  }, [orders])
  
  return(
    <>
      <div className="mt-3 flex flex-row w-full gap-2 pb-20">
        {courts.map((court : any, index : number) => {
          const playTimes = court.playTime
          return(
          <div key={index} className="flex flex-col justify-center items-center flex-1">
            <p className="font-bold text-sm text-[#434343] mb-2">Lap {court.name}</p>
            {playTimes.map((playTime : any, lock : number) => {
              const playCourt: Order = {
                id : playTime.id,
                date : court.date.date,
                court : court.name,
                start : playTime.start,
                end : playTime.end
              }
              const isOrder = orders.some(order => order.id === playCourt.id)
              const border = isOrder ? "#18A87B" : "#D9F1EA"
              return(
                playTime.status === true?
                <button key={lock} className="mb-1 py-2 border rounded-full w-full flex justify-center items-center" style={{borderColor: border}} onClick={() => {orderHandler(playCourt)}}>
                  <p className="font-ligth text-xs text-[#434343]">{`${playTime.start} - ${playTime.end}`}</p>
                </button>
                :
                <button key={lock} className="bg-[#16AA7C] mb-1 py-2 border rounded-full border-[#16AA7C] w-full flex justify-center items-center">
                  <p className="font-ligth text-xs text-[#ffffff]">Booked</p>
                </button>
              )
            })}
          </div>
        )})}
      </div>
      <button onClick={handleOpenOrder} className="checkoutBtn flex flex-row justify-between w-full bg-[#0EAF7D] py-2 px-6 rounded-full items-center justify-self-end self-end fixed bottom-10" style={{width : "calc(100% - 3rem)", transition: ".8s ease-in-out"}}>
        <div className="flex flex-col justify-center items-start">
          <p className="font-bold text-sm text-[#ffffff]">Checkout</p>
          <p className="font-ligth text-xs text-[#ffffff]">Selesaikan pembayaran</p>
        </div>
        <Image src={Kock} alt="Kock"/>
      </button>
      <section className="sectionOrder p-6 bg-[#fefefe] fixed w-full left-0 bottom-0 py-8 pt-4 flex flex-col gap-2 justify-center items-center" style={{borderTopLeftRadius: "4px", borderTopRightRadius: "4px", filter : "drop-shadow(0px -4px 20px rgba(0, 0, 0, 0.05))", transform: "translateY(100%)", transition: ".8s ease-in-out"}}>
        <button onClick={handleOpenOrder} className="bg-[#434343] w-6 h-1 rounded-lg"></button>
        <p className="text-[#434343] font-bold text-md pb-4 w-full">Detail Pemesanan</p>
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-[#434343] font-ligth text-xs">Nama</p>
          <p className="text-[#434343] font-bold text-xs">Satria Saharani</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-[#434343] font-ligth text-xs">Nomor Telp</p>
          <p className="text-[#434343] font-bold text-xs">0895622771393</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-[#434343] font-ligth text-xs">Banyak Jam Order</p>
          <p className="text-[#434343] font-bold text-xs">{orders.length} Jam</p>
        </div>
        <p className="text-[#434343] font-ligth text-xs w-full">Detail Order</p>
        <div className="flex flex-col w-full pl-3 gap-1">
          {orders.map((order, index) => (
            <div className="flex flex-row w-full justify-between items-center" key={index}>
              <p className="text-[#434343] font-ligth text-xs">Lapangan {order.name}</p>
              <p className="text-[#434343] font-ligth text-xs">({order.start} - {order.end})</p>
              <p className="text-[#434343] font-ligth text-xs">IDR 20.000</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between items-center w-full py-3">
          <p className="text-[#434343] font-ligth text-xs">Total</p>
          <p className="text-[#434343] font-bold text-xs">IDR {orders.length * 20}.000</p>
        </div>
        <button onClick={handlerOrder} className="flex flex-row justify-between w-full bg-[#0EAF7D] py-2 px-6 rounded-full items-center justify-self-end self-end">
          <div className="flex flex-col justify-center items-start">
            <p className="font-bold text-sm text-[#ffffff]">Konfirmasi Pembayaran</p>
            <p className="font-ligth text-xs text-[#ffffff]">Lanjutkan pemesanan sebesar IDR {orders.length * 20}.000</p>
          </div>
          <Image src={Kock} alt="Kock"/>
        </button>
      </section>
    </>
  )
}
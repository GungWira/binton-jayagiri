"use client"

import { useEffect, useState } from "react";

export default function OrderActive({data} : {data : any}){
  const [dateList, setDateList] = useState([])

  useEffect(() =>{
    const getDayName = (dayIndex : number) => {
      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      return dayNames[dayIndex];
    };
    const formattedDateList = data.map((item : any) => {
      const dateObj = new Date(item.date);
      const day = getDayName(dateObj.getDay()); // Get day name using custom function
      const date = `${('0' + dateObj.getDate()).slice(-2)}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${dateObj.getFullYear()}`;
      return `${day}, ${date}`;
    });
      setDateList(formattedDateList)
  }, [])
  return(
    <>
      <div className="flex flex-col w-full">
        <p className="font-bold text-md text-[#434343]">Order Lapangan</p>
        <p className="font-ligth text-xs text-[#434343]">Kamu punya orderan aktif!</p>
        {data.map ((item : any, index : number) =>(
          <div key={index} className="flex flex-row justify-between items-center border p-4 rounded mt-2">
            <div className="flex flex-col justify-center gap-1">
              <p className="font-bold text-sm text-[#434343]">Lapangan {item.court}</p>
              <p className="font-light text-xs text-[#434343]">{item.start} - {item.end}</p>
            </div>
            <p className="font-base text-xs text-[#434343]">{dateList[index]}</p>
          </div>
        ))}
      </div>
    </>
  )
}
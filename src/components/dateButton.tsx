"use client"

import Image from "next/image";
import DateIcon from "../../public/date.svg"
import Drop from "../../public/drop.svg"
import CourtTable from "./courtTable";
import { useEffect, useState } from "react";

export default function DateButton({data} : any){
  const [dateList, setDateList] = useState([])
  const [dateIndex, setDateIndex] = useState(0)

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

  const openDateList = () =>{
    document.querySelector(".box-date").style.height = "243px"
  }

  const updateDate = (index : number) =>{
    setDateIndex(index)
    document.querySelector(".box-date").style.height = "40px"
  }

  return(
    <>
      <div className="overflow-hidden h-10 box-date border border-[#0EAF7D] rounded-md mt-2 px-4" style={{filter : "drop-shadow(0px 4px 12px rgba(25, 168, 123, 0.05)", transition: "ease-in-out 1s"}}>
        <button onClick={openDateList} className="relative flex flex-col w-full justify-between items-center py-3">
          <div className="flex flex-row w-full justify-between items-center">
            <Image src={DateIcon} alt="Date" className="mr-3"/>
            <div className="fix-date flex justify-start w-full">
              <p className="font-ligth text-xs text-[#434343]">{dateList[dateIndex]}</p>
            </div>
            <Image src={Drop} alt="Drop"/>
          </div>
        </button>
        <div className="flex flex-col w-full justify-start items-start p-2 pl-6 gap-3 bottom-1/2 border-t">
          {dateList.map((date : any, index : number) => (
            <button onClick={() => updateDate(index)} key={index} className="font-ligth text-xs text-[#434343]" >{date}</button>
          ))}
        </div>
      </div>
      <CourtTable data={data[dateIndex]}/>
    </>
  )
}
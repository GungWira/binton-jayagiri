import { cookies } from "next/headers"


export default async function Card(){
  const cookiesStore = cookies()
  const name = await cookiesStore.get("username")

  return (
    <div className="bg-[#1FA37A] px-4 py-4 rounded-md mt-6 relative overflow-hidden flex items-center">
      <div className="relative z-10">
        <p className="text-[#ffffff] font-normal text-xs opacity-80">Selamat datang kembali!</p>
        <div className="mt-5 pb-8">
          <p className="text-[#ffffff] font-extrabold text-xl">{name?.value}</p>
          <p className="text-[#ffffff] font-normal text-xs opacity-80">Hari ini anda memiliki 0 jam booking lapangan</p>
        </div>
      </div>
      <div className="rounded-full aspect-square absolute left-0 bg-[#19AB7E]" style={{transform : "translateX(-30%)", height : "calc(135%)"}}></div>
      <div className="rounded-full aspect-square absolute left-0 bg-[#1BB082]" style={{transform : "translateX(-55%)", height : "calc(110%)"}}></div>
    </div>
  )
}
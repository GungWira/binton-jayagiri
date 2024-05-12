import DateButton from "@/components/dateButton";
import Header from "@/components/header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUserData = async (auth : any) =>{
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/verify`, {
      method : 'POST',
      body : JSON.stringify({auth})
    })
    const result = await data.json()
    if(result.data !== null){
      return result.data
    }
    throw new Error("Invalid auth")
  } catch (error) {
    console.log(error)
  }
}

const getData = async () =>{
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/booking`, {
      cache : "no-store",
      next : {revalidate : 0},
      method : "GET"
    })
    if(!data.ok){
      throw new Error("Failed to fetch court data")
    }
    return data.json()
  } catch (error) {
    console.log("Error loading data: ", error)
  }
}


export default async function Booking(){
  if(!cookies().get('auth')){
    redirect('/')
  }
  const auth = cookies().get('auth')
  const data = await getData()
  const userData = await getUserData(auth!.value)
  return(
    <section className="p-6">
      <Header/>
      <div className="flex flex-col w-full">
        <p className="font-bold text-md text-[#434343]">Booking Lapangan</p>
        <p className="font-ligth text-xs text-[#434343]">Banyak lapangan kosong yang nungguin kamu loh!</p>
        <DateButton data={data.data} dataUser={userData}/>
      </div>
    </section>
    
  )
}
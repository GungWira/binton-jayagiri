import Dashboard from "@/components/dashboard";
import Loading from "@/components/loading";
import { cookies } from 'next/headers'
import Login from "@/components/login";


const fetchUpdate = async () =>{
  const update = await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/update`,{
    method : "GET",
    next : {revalidate : 0},
    cache : "no-store"
  })
  return update.ok
} 


export default async function Home() {
  const cookieStrore = cookies()
  const name = cookieStrore.get('name')
  const id = cookieStrore.get('id')
  const serve = await fetchUpdate()
  
  return (
    <>
      <main>
        <Loading serve={serve}/>
        {name === undefined && id === undefined ? 
        <Login/>
        :
        <Dashboard/>
        }
      </main>
    </>
  );
}

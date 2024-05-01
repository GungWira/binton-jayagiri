import Dashboard from "@/components/dashboard";
import Loading from "@/components/loading";
import { cookies } from 'next/headers'
import Login from "@/components/login";

export default async function Home() {
  const cookieStrore = cookies()
  const name = cookieStrore.get('name')
  const id = cookieStrore.get('id')
  const update = await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/update`,{
    method : "GET",
    cache : "no-store"
  })
  return (
    <>
      <main>
        <Loading serve={update.ok}/>
        {name === undefined && id === undefined ? 
        <Login/>
        :
        <Dashboard/>
        }
      </main>
    </>
  );
}

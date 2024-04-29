import Dashboard from "@/components/dashboard";
import Loading from "@/components/loading";
import { cookies } from 'next/headers'
import Login from "@/components/login";

export default function Home() {
  const cookieStrore = cookies()
  const name = cookieStrore.get('name')
  const id = cookieStrore.get('id')
  return (
    <>
      <main>
        <Loading/>
        {name === undefined && id === undefined ? 
        <Login/>
        :
        <Dashboard/>
        }
      </main>
    </>
  );
}

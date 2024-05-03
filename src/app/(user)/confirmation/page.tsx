"use client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"


export default function SuccessPage(){
  const router = useRouter()
  const searchParams = useSearchParams()
  const order_id = searchParams.get("order_id")
  const transaction_status = searchParams.get("transaction_status")

  const updateData = async () =>{
    await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/update`, {
      method : "POST",
      headers : {
        "Content-type" : "application/json",
      },
      body : JSON.stringify({order_id, transaction_status})
    })
  }
  console.log(order_id)
  const update = updateData()
  if(transaction_status === "settlement"){
    router.push("/confirmation/success")
  }else{
    router.push("/confirmation/fail")
  }
  return(
    <>
      <section>

      </section>
    </>
  )
}
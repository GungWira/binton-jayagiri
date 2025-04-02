import Header from "@/components/header";
import OrderActive from "@/components/orderActive";
import OrderZero from "@/components/orderZero";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getData = async () => {
  const cookiesStore = cookies();
  const auth = cookiesStore.get("auth");
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/order`, {
      cache: "no-store",
      next: { revalidate: 0 },
      method: "POST",
      body: JSON.stringify({ auth: auth?.value }),
    });
    if (!data.ok) {
      throw new Error("Failed to fetch order data");
    }
    return data.json();
  } catch (error) {
    console.log("Error loading data: ", error);
  }
};

export default async function Booking() {
  if (!cookies().get("auth")) {
    redirect("/");
  }
  const data = await getData();
  const validData = data.data.filter(
    (item: any) => item.orderStatus.orderStatus === "settlement"
  );
  const isZero = validData.length;
  return (
    <section className="p-6">
      <Header />
      {isZero ? <OrderActive data={validData} /> : <OrderZero />}
    </section>
  );
}

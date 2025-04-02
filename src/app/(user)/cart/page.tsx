import Header from "@/components/header";
import CartFilled from "@/components/cartFilled";
import CartZero from "@/components/cartZero";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getData = async () => {
  const cookiesStore = cookies();
  const auth = cookiesStore.get("auth");
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/cart`, {
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

export default async function Cart() {
  if (!cookies().get("auth")) {
    redirect("/");
  }
  const data = await getData();
  const validData = data.data;
  const isZero = validData.length;
  return (
    <section className="p-6">
      <Header />
      {isZero ? <CartFilled data={validData} /> : <CartZero />}
    </section>
  );
}

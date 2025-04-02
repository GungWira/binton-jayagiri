"use client";

import Image from "next/image";
import Booking from "../../public/book.svg";
import Order from "../../public/order.svg";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex justify-center w-full px-4 -translate-y-1/2">
      <div
        className="flex flex-row py-4 rounded-md bg-[#ffffff] w-full"
        style={{ filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.05))" }}
      >
        <Link
          href={"/booking"}
          className="flex flex-row gap-2 border-r border-[#E9E9E9] flex-1 justify-center"
        >
          <Image src={Booking} alt="Booking" />
          <p className="text-[#434343] font-ligth text-xs">Booking</p>
        </Link>
        <Link
          href={"/order"}
          className="flex flex-row gap-2 border-l border-[#E9E9E9] flex-1 justify-center"
        >
          <Image src={Order} alt="Order" />
          <p className="text-[#434343] font-ligth text-xs">Order</p>
        </Link>
      </div>
    </div>
  );
}

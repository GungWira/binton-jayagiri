"use client";

import Image from "next/image";
import Pay from "../../public/pay.svg";
import { useEffect } from "react";

function formatDate(date: any) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const data = date.split("T")[0].split("-");

  return `${data[2]} ${
    months[data[1] === 10 ? 10 : parseInt(data[1].slice(0)) - 1]
  } ${data[0]}`;
}

export default function CartPageFilled({ data }: any) {
  const paymentHandler = async (order_id: string, gross_amount: number) => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_REQ_URL}/pending-payment`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          order_id: order_id,
          gross_amount: gross_amount * 20000,
        }),
      }
    );
    const valid = await req.json();
    if (valid.token !== null) {
      window.snap.pay(valid.token);
    } else {
      console.log(valid.message);
    }
  };

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey: string = process.env.NEXT_PUBLIC_CLIENT_KEY!;
    const script: any = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <section className="">
        <div className="flex flex-col w-full">
          <p className="font-bold text-md text-[#434343]">Keranjang Belanja</p>
          <p className="font-ligth text-xs text-[#434343]">
            Wah ada beberapa item di keranjang belanja!
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full mt-4 gap-1">
          {data.map((item: any, key: number) => {
            let back = "";
            let font = "";
            if (item.orderStatus === "pending") {
              back = "#FFE7C2";
              font = "#E49111";
            } else if (item.orderStatus === "cancel") {
              back = "#FFC2C2";
              font = "#E41111";
            } else {
              back = "#C2FFD7";
              font = "#11E440";
            }
            return (
              <div className="flex flex-col w-full border p-3" key={key}>
                <div className="flex flex-row w-full justify-between items-center mb-2">
                  <p className="font-bold text-base text-[#434343]">
                    {item.id}
                  </p>
                  <div className="p-1" style={{ backgroundColor: back }}>
                    <p className="font-bold text-md" style={{ color: font }}>
                      {item.orderStatus}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-2 justify-start items-center mb-2">
                  <Image src={Pay} alt="pay" />
                  <p className="text-base text-[#434343]">Total</p>
                  <div className="w-2 h-2 bg-[#e8e8e8] rounded-full"></div>
                  <p className="font-bold text-base text-[#434343]">
                    IDR {item.books.length * 20}.000
                  </p>
                </div>
                <p className="text-base text-[#434343] mb-2">
                  {formatDate(item.createdAt)}
                </p>
                {item.books.map((book: any, index: number) => {
                  return (
                    <div
                      className="flex flex-col w-full gap-2 pl-4"
                      key={index}
                    >
                      <div className="flex flex-row justify-between items-center">
                        <p className="">Lap {book.court}</p>
                        <p className="">
                          ({book.start} - {book.end})
                        </p>
                        <p className="">IDR 20.000</p>
                      </div>
                    </div>
                  );
                })}
                {item.orderStatus === "pending" ? (
                  <button
                    className="w-full p-3 bg-[#0EAF7D] mt-3 text-[#ffffff]"
                    onClick={() => {
                      paymentHandler(item.id, item.books.length);
                    }}
                  >
                    Bayar Sekarang
                  </button>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

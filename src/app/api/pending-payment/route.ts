// @ts-nocheck
import Midtrans from "midtrans-client";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verifyToken } from "@/libs/jwt";
import { generateUniqueId } from "@/libs/generateUniqueId";

const prisma = new PrismaClient();

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET_KEY,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { order_id, gross_amount } = body;
  const cookiesStore = cookies();
  const auth = cookiesStore.get("auth");
  let token = "";

  if (auth) {
    const verify = verifyToken(auth!.value);
    if (verify) {
      const curentDate = new Date();
      curentDate.setMinutes(curentDate.getMinutes() - 15);

      const validator = await prisma.order.findUnique({
        where: {
          id: order_id,
          createdAt: {
            gt: curentDate,
          },
          orderStatus: "pending",
        },
      });
      if (validator) {
        let parameter = {
          customer_details: {
            user_id: verify.id,
            username: verify?.username,
            phone: verify?.phone,
          },
          transaction_details: {
            order_id: order_id + "oId" + generateUniqueId(),
            gross_amount: gross_amount,
          },
          callbacks: {
            finish: "http://localhost:3000/confirmation",
          },
        };
        token = await snap.createTransactionToken(parameter);
        return NextResponse.json({
          message: "Token generate successfully",
          token: token,
        });
      }
    }
  }
  return NextResponse.json({
    message: "Fail to process the payment",
    token: null,
  });
}

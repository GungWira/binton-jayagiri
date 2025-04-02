import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const order_id = searchParams.get("order_id");
  const valid_order_id = order_id!.split("oId")[0];
  const transaction_status = searchParams.get("transaction_status");
  if (order_id && transaction_status) {
    if (transaction_status === "settlement") {
      const update = await prisma.order.update({
        where: {
          id: parseInt(valid_order_id),
        },
        data: {
          orderStatus: transaction_status,
        },
        select: {
          items: true,
        },
      });
      if (update) {
        const items = update.items;
        const finalUpdate = await prisma.playtime.updateMany({
          where: {
            id: {
              in: items.map((item) => item.itemID),
            },
          },
          data: {
            status: 2,
          },
        });
        if (finalUpdate) {
          redirect("/confirmation/success");
        }
      }
    } else {
      const dataOrder = await prisma.order.update({
        where: {
          id: parseInt(order_id),
        },
        data: {
          orderStatus: "cancel",
        },
        select: {
          items: true,
        },
      });
      if (dataOrder) {
        const updateIds = dataOrder.items;
        const update = await prisma.playtime.updateMany({
          where: {
            id: {
              in: updateIds.map((id) => id.itemID),
            },
          },
          data: {
            status: 1,
          },
        });
        if (update) {
          redirect("/confirmation/fail");
        }
      }
    }
  } else {
    redirect("/");
  }
  return NextResponse.json({ message: "Order success" });
}

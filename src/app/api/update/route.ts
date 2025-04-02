import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const date = new Date();
  const convertToISOSting = (obj: String) => {
    const year: number = parseInt(obj.split(",")[0].split("/")[2]);
    const month: number = parseInt(obj.split(",")[0].split("/")[0]) - 1;
    const day: number = parseInt(obj.split(",")[0].split("/")[1]);

    const newDate = new Date(year, month, day, 8, 0, 0);
    return newDate.toISOString();
  };
  const curentDate = convertToISOSting(
    date.toLocaleString("en-US", { timeZone: "Asia/Makassar", hour12: false })
  );
  const maxDay = new Date();
  maxDay.setDate(date.getDate() + 7);
  const curentMaxDate = convertToISOSting(
    maxDay.toLocaleString("en-US", { timeZone: "Asia/Makassar", hour12: false })
  );

  const dataCount = await prisma.dateList.count({
    where: {
      AND: [{ date: { gte: curentDate } }, { date: { lt: curentMaxDate } }],
    },
  });

  // update data based time
  const updateDataBaseTime = async () => {
    const curentHourTime = parseInt(
      date
        .toLocaleString("id-ID", { timeZone: "Asia/Makassar" })
        .split(" ")[1]
        .split(".")[0]
    );
    const tomorowDate = new Date();
    tomorowDate.setDate(date.getDate() + 1);
    const curentTomorrowDate = convertToISOSting(
      tomorowDate.toLocaleString("en-US", {
        timeZone: "Asia/Makassar",
        hour12: false,
      })
    );
    await prisma.playtime.updateMany({
      where: {
        date: { gte: curentDate, lt: curentTomorrowDate },
        AND: {
          startHour: { lte: curentHourTime },
        },
      },
      data: {
        status: 0,
      },
    });
    return true;
  };

  // update cart based time
  const updateCartBaseTime = async () => {
    const curentDate = new Date();
    const playTimeIDs: number[] = [];
    curentDate.setMinutes(curentDate.getMinutes() - 15); // lima belas menit sebelumnya
    const results = await prisma.order.findMany({
      where: {
        orderStatus: "pending",
        createdAt: {
          lte: curentDate,
        },
      },
      select: {
        items: true,
      },
    });
    if (results) {
      results.map((result) => {
        result.items.map((item) => {
          playTimeIDs.push(item.itemID);
        });
      });
      const expired = await prisma.order.updateMany({
        where: {
          orderStatus: "pending",
          createdAt: {
            lte: curentDate,
          },
        },
        data: {
          orderStatus: "cancel",
        },
      });
      if (expired) {
        const update = await prisma.playtime.updateMany({
          where: {
            id: {
              in: playTimeIDs,
            },
          },
          data: {
            status: 1,
          },
        });
        if (update) {
          return updateDataBaseTime();
        }
      }
    }
  };
  if (dataCount < 7) {
    // if no
    const gapDate = 7 - dataCount;
    const setter = dataCount === 0 ? 0 : 1;
    for (let i = setter; i <= gapDate; i++) {
      const newDate = new Date();
      newDate.setDate(date.getDate() + dataCount + i);
      const formatedDate = convertToISOSting(
        newDate.toLocaleString("en-US", {
          timeZone: "Asia/Makassar",
          hour12: false,
        })
      );
      await prisma.dateList.create({
        data: {
          date: formatedDate,
          status: true,
          courts: {
            create: [
              {
                name: "A",
                playTime: {
                  createMany: {
                    data: [
                      {
                        start: "08.00",
                        end: "09.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 8,
                      },
                      {
                        start: "09.00",
                        end: "10.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 9,
                      },
                      {
                        start: "10.00",
                        end: "11.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 10,
                      },
                      {
                        start: "11.00",
                        end: "12.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 11,
                      },
                      {
                        start: "12.00",
                        end: "13.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 12,
                      },
                      {
                        start: "13.00",
                        end: "14.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 13,
                      },
                      {
                        start: "14.00",
                        end: "15.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 14,
                      },
                      {
                        start: "15.00",
                        end: "16.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 15,
                      },
                      {
                        start: "16.00",
                        end: "17.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 16,
                      },
                      {
                        start: "17.00",
                        end: "18.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 17,
                      },
                      {
                        start: "18.00",
                        end: "19.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 18,
                      },
                      {
                        start: "19.00",
                        end: "20.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 19,
                      },
                    ],
                  },
                },
              },
              {
                name: "B",
                playTime: {
                  createMany: {
                    data: [
                      {
                        start: "08.00",
                        end: "09.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 8,
                      },
                      {
                        start: "09.00",
                        end: "10.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 9,
                      },
                      {
                        start: "10.00",
                        end: "11.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 10,
                      },
                      {
                        start: "11.00",
                        end: "12.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 11,
                      },
                      {
                        start: "12.00",
                        end: "13.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 12,
                      },
                      {
                        start: "13.00",
                        end: "14.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 13,
                      },
                      {
                        start: "14.00",
                        end: "15.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 14,
                      },
                      {
                        start: "15.00",
                        end: "16.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 15,
                      },
                      {
                        start: "16.00",
                        end: "17.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 16,
                      },
                      {
                        start: "17.00",
                        end: "18.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 17,
                      },
                      {
                        start: "18.00",
                        end: "19.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 18,
                      },
                      {
                        start: "19.00",
                        end: "20.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 19,
                      },
                    ],
                  },
                },
              },
              {
                name: "C",
                playTime: {
                  createMany: {
                    data: [
                      {
                        start: "08.00",
                        end: "09.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 8,
                      },
                      {
                        start: "09.00",
                        end: "10.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 9,
                      },
                      {
                        start: "10.00",
                        end: "11.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 10,
                      },
                      {
                        start: "11.00",
                        end: "12.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 11,
                      },
                      {
                        start: "12.00",
                        end: "13.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 12,
                      },
                      {
                        start: "13.00",
                        end: "14.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 13,
                      },
                      {
                        start: "14.00",
                        end: "15.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 14,
                      },
                      {
                        start: "15.00",
                        end: "16.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 15,
                      },
                      {
                        start: "16.00",
                        end: "17.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 16,
                      },
                      {
                        start: "17.00",
                        end: "18.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 17,
                      },
                      {
                        start: "18.00",
                        end: "19.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 18,
                      },
                      {
                        start: "19.00",
                        end: "20.00",
                        status: 1,
                        date: formatedDate,
                        startHour: 19,
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      });
    }
  }
  const updateCart = await updateCartBaseTime();
  if (updateCart) {
    return NextResponse.json(
      { message: "Data ready to serve!", serve: true },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "Data ready to serve!", serve: true },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const { order_id, transaction_status } = await request.json();
  const update = await prisma.order.update({
    where: {
      id: order_id,
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
    await prisma.playtime.updateMany({
      where: {
        id: {
          in: items.map((item) => item.itemID),
        },
      },
      data: {
        status: 2,
      },
    });
  }
  console.log(update.items);
  return NextResponse.json({ message: "Order success" });
}

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

const convertToISOSting = (obj: String) => {
  const year: number = parseInt(obj.split(",")[0].split("/")[2]);
  const month: number = parseInt(obj.split(",")[0].split("/")[0]) - 1;
  const day: number = parseInt(obj.split(",")[0].split("/")[1]);

  const newDate = new Date(year, month, day, 8, 0, 0);
  return newDate.toISOString();
};

export async function GET(request: NextRequest) {
  const date = new Date();
  const curentDate = convertToISOSting(
    date.toLocaleString("en-US", { timeZone: "Asia/Makassar", hour12: false })
  );
  const maxDay = new Date();
  maxDay.setDate(maxDay.getDate() + 7);
  const curentMaxDay = convertToISOSting(
    maxDay.toLocaleString("en-US", { timeZone: "Asia/Makassar", hour12: false })
  );

  const datas = await prisma.dateList.findMany({
    where: {
      status: true,
      AND: [{ date: { gte: curentDate } }, { date: { lt: curentMaxDay } }],
    },
    select: {
      date: true,
      courts: {
        select: {
          name: true,
          date: true,
          playTime: {
            select: {
              id: true,
              start: true,
              end: true,
              startHour: true,
              date: true,
              status: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json({
    message: "Date successfully fetched",
    data: datas,
  });
}

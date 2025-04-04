import { cookies } from "next/headers";

const fetchData = async (auth: any) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_REQ_URL}/verify`, {
    method: "POST",
    body: JSON.stringify({ auth }),
  });
  return data;
};

export default async function Card() {
  const cookieStore = cookies();
  const auth = cookieStore.get("auth")!.value;
  const fetch = await fetchData(auth);
  const data = await fetch.json();
  return (
    <div className="bg-[#1FA37A] px-4 py-4 rounded-md mt-6 relative overflow-hidden flex items-center">
      <div className="relative z-10">
        <p className="text-[#ffffff] font-normal text-xs opacity-80">
          Selamat datang kembali!
        </p>
        <div className="mt-5 pb-8">
          <p className="text-[#ffffff] font-extrabold text-xl">
            {data.data.username}
          </p>
          <p className="text-[#ffffff] font-normal text-xs opacity-80">
            Hari ini anda memiliki 0 jam booking lapangan
          </p>
        </div>
      </div>
      <div
        className="rounded-full aspect-square absolute left-0 bg-[#19AB7E]"
        style={{ transform: "translateX(-30%)", height: "calc(135%)" }}
      ></div>
      <div
        className="rounded-full aspect-square absolute left-0 bg-[#1BB082]"
        style={{ transform: "translateX(-55%)", height: "calc(110%)" }}
      ></div>
    </div>
  );
}

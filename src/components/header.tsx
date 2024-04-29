import Image from "next/image";
import Logo from "../../public/Logo.svg"
import Card from "./card";
import Navigation from "./navigation";

export default function Header(){
  return (
    <>
      <header className="flex justify-start items-center gap-2">
        <Image src={Logo} alt="Logo Binton Jayagiri" className="w-7"/>
        <p className="text-base font-bold text-[#434343]">Binton Jayagiri</p>
      </header>
      <Card/>
      <Navigation/>
    </>
  )
}
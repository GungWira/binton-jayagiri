import Image from "next/image";
import Logo from "../../public/Logo.svg";
import Cart from "../../public/cart-filled.svg";
import Card from "./card";
import Navigation from "./navigation";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center w-full">
        <div className="flex flex-row gap-2 justify-center items-center">
          <Image src={Logo} alt="Logo Binton Jayagiri" className="w-7" />
          <p className="text-base font-bold text-[#434343]">Binton Jayagiri</p>
        </div>
        <div>
          <Link href={"/cart"}>
            <Image src={Cart} alt="Cart" />
          </Link>
        </div>
      </header>
      <Card />
      <Navigation />
    </>
  );
}

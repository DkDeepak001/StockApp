import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="bg-black h-[100vh] -full flex justify-center items-center text-white">
      Hello from Next js
    </div>
  );
}

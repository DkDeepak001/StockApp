import Image from "next/image";
import { Inter } from "next/font/google";
import { api } from "~/utils/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, isLoading } = api.auth.getSession.useQuery();
  console.log("data", data, isLoading);
  return (
    <div className="bg-black h-[100vh] -full flex justify-center items-center text-white">
      Hello from Next js
    </div>
  );
}

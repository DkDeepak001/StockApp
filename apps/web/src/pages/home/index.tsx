import { Inter } from "next/font/google";
import { api } from "~/utils/api";


export default function Home() {
  const { data } = api.auth.getSecretMessage.useQuery()
  console.log(data)
  return (
    <div>
      <div className="bg-black h-[100vh] -full flex justify-center items-center text-white">
        home
      </div>
    </div>
  );
}



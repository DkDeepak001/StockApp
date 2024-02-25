import { Inter } from "next/font/google";
import { api } from "~/utils/api";


export default function Login() {
  const handleLogin = () => {
    console.log("login")
  }
  return (
    <div>
      <div className="bg-black h-[100vh] -full flex justify-center items-center text-white">
        Login
      </div>
      <button className="bg-blue-400 px-5 py-3 text-white" onClick={handleLogin}>Login</button>
    </div>
  );
}


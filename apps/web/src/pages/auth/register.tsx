import { Inter } from "next/font/google";
import { api } from "~/utils/api";


export default function Register() {
  const handleRegister = () => {
    console.log("Register")
  }
  return (
    <div>
      <div className="bg-black h-[100vh] -full flex justify-center items-center text-white">
        Register
      </div>
      <button className="bg-blue-400 px-5 py-3 text-white" onClick={handleRegister}>Register</button>
    </div>
  );
}



// import connectToDatabase from "@/lib/mongoose";
"use client"
import Image from "next/image";
import Link from "next/link";
import { useUser } from "./context/User";
import { useEffect } from "react";

export default  function Home() {
  // const conn = await connectToDatabase();
  // console.log(conn)
  
  // const { user, setUser } = useUser()

  
  // useEffect(() => {
  //   setUser({ name: "hello" });
  // }, []);

  return (
    <>
      {/* <h1>{user?.name}</h1> */}
      <div className="flex items-center justify-center p-10">
        <h1 className="text-3xl">Welcome to Rentify</h1>
      </div>
      <div className="flex items-center justify-center p-10">
        <Link href={"/home"}>Home</Link>
      </div>

      <div className="flex items-center justify-center p-10">
        <div>
          <h2 className="text-2xl"> Are you a Buyer</h2>
          <button>Login</button>
          <button>Register</button>
        </div>
        <div className="px-5">
          <h2 className="text-2xl"> Are you a Seller</h2>
          <Link href={"/login"}>Login</Link>
          <Link href={"/register"}>Register</Link>
        </div>
      </div>
    </>
  );
}

"use client"
import Link from "next/link";
import { useUser } from "../context/User";

export default function HomePage() {

    const {user,setUser} = useUser();

    return (
        <>
        <h1>hello {user?.email}</h1>
        <h1>Home page</h1>
        <Link href={"/logout"}>Logout</Link>
        </>
    );
}


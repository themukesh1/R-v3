// CookieChecker.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookie from "@/lib/getCookies";
import { useUser } from "../context/User";
import LoginById from "./login";

async function Log(userId) {
  // Log in with id
  const data = await LoginById(userId);
  return data;
}

function CookieChecker({ children }) {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const userId = getCookie("id");
    if (!userId) {
      // Redirect the user to the login page or handle the absence of user ID as per your application logic
    //   router.push('/'); // Example redirect
    } else {
      Log(userId).then((data) => {
        if (data && data.user) {
          setUser(data.user);
          console.log(data.user)
        } else {
          // Handle the case where login failed or user data is not present
          router.push('/login'); // Example redirect
        }
      }).catch((error) => {
        console.error("Error logging in with ID:", error);
        router.push('/login'); // Example redirect
      });
    }
  }, [router, setUser]);

  return children;
}

export default CookieChecker;

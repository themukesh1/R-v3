"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/User";
import setCookie from "@/lib/setCokkies";

export default function Verification({ params }) {
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();
  const { user, setUser } = useUser();
  const [reply, setReply] = useState();
  const { id } = params;
  console.log(params);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make PUT request to verify user
      const response = await fetch("/api/user/verification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode, id: id }), // Use userId obtained from query parameters
      });

      // Handle response
      const res = await response.json();
      console.log(res);

      if (res?.message === "Verification code has expired") {
        setReply("code expired (add option to regenerate)");
        // please regenrate it
      } 
      else if (res?.message === "Invalid verification code") {
        setReply("invalid verification code");
        // please regenrate it
      }
      else {
        setUser(res.res);
        setCookie("id", res.res._id, 30);

        router.push("/home");
      }
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Verification Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Validation Code:</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <h1>{reply}</h1>
        <button type="submit">Validate</button>
      </form>
    </div>
  );
}

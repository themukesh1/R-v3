"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/User";
import setCookie from "@/lib/setCokkies";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  let { user, setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [reply, setReply] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.BACKEND_API}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const user = await response.json();
      console.log(user);

      if (user?.message === "Invalid credentials") {
        setReply("invalid credential");
      } else if (user?.message === "User not verified") {
        console.log(user)
        // setReply("user not validate");
        router.push(`/verification/${user.id}`)

      } else {
        setUser(user.user);
        setCookie("id", user.user._id, 30);
        // Assuming the login API returns some user data
        // Redirect to dashboard page after successful login
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <h1>{reply}</h1>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

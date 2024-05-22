import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
export async function POST(request) {
    const { email, password } = await request.json();

    // console.log({email,password})

    
    await connectToDatabase();

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 201 });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return NextResponse.json({message:"password wrong"},{status:201})
        }

        if (user.isVerified) {
            return NextResponse.json({ user }, { status: 200 });
        }

        return NextResponse.json({ message: "User not verified", id:user._id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

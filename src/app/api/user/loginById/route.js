import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { id } = await request.json();

    console.log({id})
    
    await connectToDatabase();

    try {
        const user = await User.findOne({ _id:id });
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        if (user.isVerified) {
            return NextResponse.json({ user }, { status: 200 });
        }

        return NextResponse.json({ message: "User not verified" }, { status: 403 });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

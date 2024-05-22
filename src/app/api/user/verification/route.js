import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const { verificationCode, id } = await request.json();

    await connectToDatabase();

    try {
        // Find the user by ID and verification code
        const user = await User.findOne({ _id: id, verificationCode });

        if (!user) {
            return NextResponse.json({ message: "Invalid verification code" }, { status: 200 });
        }

        // Check if the verification code has expired
        if (user.verificationExpires < new Date()) {
            return NextResponse.json({ message: "Verification code has expired" }, { status: 200 });
        }

        // Verification successful, update user's verification status
        user.isVerified = true;
        const res = await user.save();

        return NextResponse.json({ message: "Email verified successfully",res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

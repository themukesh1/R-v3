import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import crypto from 'crypto';


export async function POST(request) {
  const { email, phoneNumber, password } = await request.json();
  await connectToDatabase();

  // Check if a user with the provided email or phone number already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 200 });
  }

  // Set verification expiration to 1 hour from now
  const verificationExpires = new Date();
  verificationExpires.setHours(verificationExpires.getHours() + 1); // 1 hour from now

  // Create the new user
  const verificationCode = crypto.randomInt(100000, 999999).toString();
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await User.create({ email, phoneNumber, password:hashedPassword, verificationCode, verificationExpires });

  if(res?._id){
    try{
      const response = await fetch("http://localhost:3000/api/otp",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email:res.email,otp:verificationCode})
      })

      if(response.id){
          return NextResponse({message:"OTP send"},{status:200})
      }
      return NextResponse({message:"something wrong"},{status:400})
    }
    catch (error){
        console.log(error)
    }
  }
  

  return NextResponse.json(res, { status: 201 });
}


// email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: String, required: true, unique: true },
//   isVerified: { type: Boolean, default: false },
//   verificationCode: String,
//   verificationExpires: Date,
//   posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],

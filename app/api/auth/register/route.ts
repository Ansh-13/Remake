import { NextRequest, NextResponse } from "next/server";
import { connect2database } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email ans pass is required" },
        { status: 400 }
      );
    }
    await connect2database();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already existed" },
        { status: 400 }
      );
    }
    await User.create({
      email,
      password,
    });
    return NextResponse.json({ message: "Email regsiter" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "fail to register user" },
      { status: 500 }
    );
  }
}

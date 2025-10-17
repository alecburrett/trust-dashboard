import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Check if admin already exists
    const existingAdmin = db.getAdminUser(email);
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin user already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = db.createAdminUser({
      email,
      passwordHash,
      name,
    });

    return NextResponse.json(
      { message: "Admin user created successfully", id: admin.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin user:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}

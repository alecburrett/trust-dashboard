import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const controls = db.getSecurityControls();
    return NextResponse.json(controls);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch controls" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const control = db.createSecurityControl(data);
    return NextResponse.json(control, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create control" },
      { status: 500 }
    );
  }
}

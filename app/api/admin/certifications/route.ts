import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const certifications = db.getCertifications();
    return NextResponse.json(certifications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch certifications" },
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
    const certification = db.createCertification(data);
    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create certification" },
      { status: 500 }
    );
  }
}

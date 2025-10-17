import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const branding = db.getBrandingConfig();
    return NextResponse.json(branding);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch branding" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const branding = db.updateBrandingConfig(data);
    return NextResponse.json(branding);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update branding" },
      { status: 500 }
    );
  }
}

import { register } from "@/actions/register";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/Schemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const values: z.infer<typeof RegisterSchema> = await req.json();
    const data = await register(values);
    if (data.success) {
      return new NextResponse("Registration successful", { status: 200 });
    }
  } catch (error) {
    console.error("Registration error", error);
    return new NextResponse(
      JSON.stringify({ status: "error", message: "Internal server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

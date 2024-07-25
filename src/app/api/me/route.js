import { getToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const token = await getToken();
  return NextResponse.json({ token: token });
};

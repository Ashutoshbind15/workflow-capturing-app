import { NextResponse } from "next/server";

export const GET = async () => {};

export const POST = async (req) => {
  const data = await req.json();
  console.log(data);
  return NextResponse.json(data, {
    status: 200,
  });
};

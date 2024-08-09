import { WorkFlow } from "@/models/WorkFlows";
import { getToken } from "@/utils/auth";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const token = await getToken();

  if (!token) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("page");

  const take = 10;
  const page = parseInt(query) || 1;

  const uid = token.user.sub;
  const workflows = await WorkFlow.find({ user: uid })
    .skip((page - 1) * take)
    .limit(take)
    .sort({ createdAt: -1 });

  return NextResponse.json(workflows, { status: 200 });
};

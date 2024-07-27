import { WorkFlow } from "@/models/WorkFlows";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  await connectDB();
  const workflow = await WorkFlow.findById(id);
  return NextResponse.json(workflow, { status: 200 });
};

import connectDB from "@/utils/db";

export const POST = async (req) => {
  const data = await req.json();
  await connectDB();
};

export const PUT = async (req) => {};

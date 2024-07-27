import { WorkFlow } from "@/models/WorkFlows";
import { getToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const GET = async () => {};

export const POST = async (req) => {
  const data = await req.json();

  const { event } = data;
  const userToken = await getToken();

  if (!userToken) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const uid = userToken.user.sub;
  console.log(`User ${uid} captured ${event}`);

  if (event === "start") {
    const workflow = new WorkFlow({
      user: uid,
    });

    await workflow.save();

    cookies().set({
      name: "wid",
      value: workflow._id,
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    return NextResponse.json({ msg: "Success" }, { status: 200 });
  } else {
    const wid = cookies().get("wid")?.value;
    cookies().set("wid", "", { expires: new Date(0) });
    return NextResponse.json({ wid }, { status: 200 });
  }
};

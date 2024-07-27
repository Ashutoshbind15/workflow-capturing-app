import { WorkFlow } from "@/models/WorkFlows";
import { getToken } from "@/utils/auth";
import {
  saveImageFromDataUriToLocalDisk,
  uploadImageFromDataUri,
} from "@/utils/imageupload";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {};

export const POST = async (req) => {
  console.log("capture ep");
  const data = await req.json();

  const userToken = await getToken();

  if (!userToken) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const workflow = cookies().get("wid")?.value;

  if (!workflow) {
    return NextResponse.json({ msg: "No workflow started" }, { status: 400 });
  }

  const dbwflw = await WorkFlow.findById(workflow);

  if (!dbwflw) {
    return NextResponse.json({ msg: "No workflow found" }, { status: 400 });
  }

  const typeInteraction = data.type;
  const shot = data.screenshot;
  const { x, y, sx, sy } = data;

  const matches = shot.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);

  if (!matches) {
    return NextResponse.json({ msg: "Invalid screenshot" }, { status: 400 });
  }

  const imageBuffer = Buffer.from(matches[2], "base64");
  const imageType = matches[1];

  console.log(`User ${userToken.user.sub} captured ${typeInteraction}`);
  console.log(imageBuffer);
  console.log(imageType);

  const res = await uploadImageFromDataUri(shot, x, y, sx, sy);

  if (res.success) {
    dbwflw.shots.push({ url: res.url, title: typeInteraction });
    await dbwflw.save();
    return NextResponse.json(data, {
      status: 200,
    });
  } else {
    return NextResponse.json({ msg: "Error uploading image" }, { status: 500 });
  }
};

import { Chat } from "@/models/Chat";
import { Section } from "@/models/Section";
import { Team } from "@/models/Team";
import { User } from "@/models/User";
import { WorkFlow } from "@/models/WorkFlows";
import { getToken } from "@/utils/auth";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const token = await getToken();
  if (!token) {
    return NextResponse.json(
      {
        msg: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const uid = token.user.sub;
  const { id: tid } = params;

  await connectDB();

  const team = await Team.findById(tid).populate([
    {
      path: "members",
      model: User,
    },
    {
      path: "workflows",
      model: WorkFlow,
    },
    {
      path: "sections",
      model: Section,
    },
    {
      path: "chat",
      model: Chat,
    },
    {
      path: "admin",
      model: User,
    },
  ]);

  const isPartOfTeam = team.members.some(
    (member) => member._id.toString() === uid
  );

  if (!isPartOfTeam) {
    return NextResponse.json(
      {
        msg: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json(team, {
    status: 200,
  });

  //   const isAdmin = team.admin._id.toString() === uid;
};

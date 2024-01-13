import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authoptions";

export async function PATCH(req: NextRequest) {
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Invalid user" }, { status: 405 });
  const id = await req.json();
  const closedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: { status: "CLOSED" },
  });

  return NextResponse.json(closedIssue, { status: 200 });
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authoptions";

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Invalid user" }, { status: 405 });
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { error: "Missing 'id' in request body" },
      { status: 400 }
    );
  }
  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const closedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { status: "CLOSED" },
  });

  return NextResponse.json(closedIssue, { status: 200 });
}
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Invalid user" }, { status: 405 });
  const { id } = await req.json();

  const assigneeIssue = await prisma.issue.findFirst({
    where: { assignedToUserId: id },
  });
  return NextResponse.json(assigneeIssue, { status: 200 });
}

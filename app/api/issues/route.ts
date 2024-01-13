import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../validation-schema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authoptions";

export async function POST(req: NextRequest) {
  const session = getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      { error: "invalid session or user not authenticated" },
      { status: 401 }
    );
  const body = await req.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}

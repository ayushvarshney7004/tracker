import React from "react";

import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authoptions";

const IssueForm = dynamic(() => import("@/app/issues/_component/issueform"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;

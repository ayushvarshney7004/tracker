import prisma from "@/prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";

import { notFound, redirect } from "next/navigation";
import EditIssueButton from "./editIssueButton";
import IssueDetails from "./issueDetails";
import DeleteIssueButton from "./deleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authoptions";
import AssigneeSelect from "./assignee";
import { cache } from "react";
import CloseIssueButton from "./closeIssueButton";
interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  

  const issue = await fetchUser((params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <div className="flex flex-col items-center">
          <Text> Assigned To</Text>
          <AssigneeSelect issue={issue} />
        </div>

        <IssueDetails issue={issue} />
      </Box>
      <Box className="flex justify-center items-center flex-col">
        {session && (
          <Flex direction="column" gap="4" className="flex items-center">
            <EditIssueButton issueId={issue.id} />
            <CloseIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};
export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(params.id);

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
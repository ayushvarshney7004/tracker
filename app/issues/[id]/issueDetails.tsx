import Statusbadge from "@/app/component/statusbadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { AiFillBackward } from "react-icons/ai";
import Link from "next/link";
import { Status } from "../list/IssueList";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Flex className="space-x-3" my="2">
        <Link href="/issues/list" className="mt-2">
          <AiFillBackward />
        </Link>
        <Heading>{issue.title}</Heading>
        <Statusbadge status={issue.status as keyof typeof Status} />
      </Flex>
      <Text>{issue.createdAt.toDateString()}</Text>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
"use client";
import { Issue } from "@prisma/client";
import { Text, Flex, Box, Card, Button,Link } from "@radix-ui/themes";
import Statusbadge from "../component/statusbadge";
import { Status } from "../issues/list/IssueList";
import { useEffect } from "react";
import axios from "axios";
import { Dispatch,SetStateAction } from "react";
import { toast } from "react-hot-toast";
import IssueUpgrade from "./issueUpgrade";

const IssueCard = ({
  issues,
  status,
  setRefresh,
}: {
  issues: Issue[] | Issue;
  status: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
 
  const issuesArray = Array.isArray(issues) ? issues : [issues];
  const filterIssues = issuesArray.filter((issue) => issue.status === status);

  return (
    <>
      {filterIssues?.map((issue) => (
        <Card key={issue.id}>
          {" "}
          {/*the color pattern can be assigned in card component using style attribute */}
          <Flex gap={"4"} align={"center"}>
            <Box className="flex  space-x-2 items-center">
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <Statusbadge status={issue.status as keyof typeof Status} />
              <div className="justify-end mt-0 ">
                <IssueUpgrade id={issue.id} setRefresh={setRefresh}/>
              </div>
            </Box>
          </Flex>
        </Card>
      ))}
    </>
  
  );
};

export default IssueCard;

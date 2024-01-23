"use client";
/* eslint-disable */
import { Text, Button, Flex } from "@radix-ui/themes";
import IssueCard from "./issueCard";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "@prisma/client";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

import AvatarFilter from "../component/avatarFilter";
import { useSession } from "next-auth/react";

export default function Board() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/");
  }
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [userissue, setUserIssue] = useState<string>("unassigned");

  const statuses = [
    {
      id: 1,
      label: "Open",
      value: "OPEN",
    },
    {
      id: 2,
      label: "In Progress",
      value: "IN_PROGRESS",
    },
    { id: 3, label: "Closed", value: "CLOSED" },
  ];
  const handleUserId = (id: string) => {
    setUserIssue(id);
  };

  const {
    data: issues,
    isLoading,
    error,
  } = useQuery<Issue[]>({
    queryKey: ["issues", userissue, refresh],
    queryFn: () => {
      if (userissue !== "unassigned") {
        return axios
          .post("/api/del", { id: userissue })
          .then((res) => res.data);
      } else {
        return axios.get("/api/issues").then((res) => res.data);
      }
    },
    //staleTime:1*100;
    //retry : 1
  });

  if (isLoading) return <Skeleton height={"35rem"} highlightColor={"green"} />;

  if (error) return null;

  return (
    <div className="items-center  h-[35rem] space-y-2 w-full">
      <meta name="Issue-Tracker - Board" content="board to filter issue accordingly users and status"/>
      <div className="flex w-full sm:space-x-[32rem] md:space-x-[32rem] lg:space-x-[58rem] items-center  ">
        <div className="flex flex-col w-fit  justify-start">
          <Text> User Filter</Text>
          <AvatarFilter handleUserId={handleUserId} />
        </div>

        <div className="flex  items-start w-fit justify-start bg-violet-600 ">
          <Button
            size={"1"}
            className="max-w-xs"
            onClick={() => {
              router.push("/issues/new"), router.refresh();
            }}
          >
            New Issues
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center w-full space-x-2 ">
        {statuses?.map((item) => (
          <div className="flex flex-col items-center border max-h-[30rem] h-[30rem] lg:w-full">
            <Text key={item.id}>{item.label}</Text>
            <div className="space-y-4">
              <IssueCard
                issues={issues!}
                status={item.value}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


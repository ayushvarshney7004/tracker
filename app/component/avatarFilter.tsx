"use client";
import { User } from "@prisma/client";
import { Avatar, Select, Text, Button } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
const AvatarFilter = ({
handleUserId
}: {
  handleUserId:(id:string)=>void
 
}) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1 * 100,
    retry: 2,
  });
  if (isLoading) return <Skeleton width={"4rem"}/>;
 
  return (
    <Select.Root defaultValue="unassigned" onValueChange={(id:string)=>handleUserId(id)}>
      <Select.Trigger placeholder="All Users" />
      <Select.Content className="space-x-2">
        <Select.Group  spellCheck>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id} className="space-y-2" >
              <Avatar
                src={user!.image!}
                fallback="?"
                size="1"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
              <Text size={"1"}>{user.name}</Text>
            </Select.Item>
          ))}
          <Select.Separator />
          <Select.Item value="unassigned" onClick={()=>handleUserId("unassigned")}>
            <Text color="cyan">Un-Assigned</Text>
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
export default AvatarFilter;

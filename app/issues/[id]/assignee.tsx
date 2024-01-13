"use client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { User, Issue } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { status } = useSession();
  const router = useRouter();
  const { data: users, isLoading, error } = useUser();
  if (isLoading) return <Skeleton />;
  if (error) return null;
  const assignIssue = (userid: String) => {
    if (status === "unauthenticated")
      return toast.error("Please Login first to assign the issue");
    try {
      axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userid || null,
      });
      toast.success("Issue Assigned successfully");
      // router.push("/issues/list");
      router.refresh();
    } catch (error) {
      toast.error("An Error Occurred , Try again");
      router.refresh();
    }
  };
  return (
    <div>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};
const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;

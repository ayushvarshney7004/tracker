"use client";
// import { Status } from "@prisma/client";
import { Status } from "./IssueList";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
const statusUse: { label: String; value?:keyof typeof Status }[] = [
  { label: "All" },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
  {
    label: "In-Progress",
    value: "IN_PROGRESS",
  },
];
const IssueFiter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

   
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter(Status)" />
      <Select.Content>
        {statusUse.map((status) => (
          <Select.Item value={status.value || ""} key={status.value}>{status.label}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
export default IssueFiter;

"use client ";
import React from "react";
import { DropdownMenu, Button, Box, Text } from "@radix-ui/themes";
import axios from "axios";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";

const IssueUpgrade = ({
  id,
  setRefresh,
}: {
  id: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const MoveIssueHandler = async (flag: string) => {
    try {
      switch (flag) {
        case "Open":
          await axios.patch("/api/issues/" + id, { status: "OPEN" });
          break;
        case "In_Progress":
          await axios.patch("/api/issues/" + id, { status: "IN_PROGRESS" });
          break;
        case "Closed":
          await axios.patch("/api/del", { id });
          break;
        default:
          break;
      }
      toast.success(`issue moved to ${flag}`);
      setRefresh(true);
    } catch (error) {
      toast.error("An error occured");
    }
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" color="blue" size={"1"}>
          Move
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          color="red"
          onClick={() => {
            MoveIssueHandler("Open");
          }}
        >
          Open
        </DropdownMenu.Item>
        <DropdownMenu.Item
          color="yellow"
          onClick={() => {
            MoveIssueHandler("In_Progress");
          }}
        >
          In Progress
        </DropdownMenu.Item>
        <DropdownMenu.Item
          color="green"
          onClick={() => {
            MoveIssueHandler("Closed");
          }}
        >
          Closed
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
export default IssueUpgrade;

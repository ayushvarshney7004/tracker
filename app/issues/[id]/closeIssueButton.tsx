"use client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
const CloseIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const closeIssueHandler = async () => {
    try {
      await axios.patch("/api/del", issueId);
      toast.success("Issue is closed");
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      toast.error("An Error occurred Try again!");
    }
  };
  return (
    <div>
      <Button onClick={() => closeIssueHandler()}>Close Issue</Button>
    </div>
  );
};
export default CloseIssueButton;

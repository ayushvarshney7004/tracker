"use client";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
const statusMap: Record<
  Status,
  { label: string; color: "red" | "yellow" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
  CLOSED: { label: "Close", color: "green" },
};
const Statusbadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};
export default Statusbadge;
import { Badge } from "@radix-ui/themes";

export const Status = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED',
} as const;

export type StatusKey = keyof typeof Status;

const statusMap: Record<
  StatusKey,
  { label: string; color: "red" | "yellow" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
  CLOSED: { label: "Close", color: "green" },
};

const Statusbadge = ({ status }: { status: StatusKey }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default Statusbadge;

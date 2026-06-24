export type StatusTone = "success" | "warning" | "destructive" | "primary" | "muted";

export const STATUS_STYLES: Record<StatusTone, string> = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/15 text-destructive",
  primary: "bg-primary/15 text-primary",
  muted: "bg-muted text-muted-foreground",
};

export function statusToneFromInventory(status: string): StatusTone {
  if (status === "critical") return "destructive";
  if (status === "low") return "warning";
  return "success";
}

export function statusToneFromPayment(status: string): StatusTone {
  if (status === "Approved" || status === "Paid" || status === "matched") return "success";
  if (status === "Pending" || status === "pending") return "warning";
  if (status === "unmatched") return "destructive";
  return "primary";
}

"use client";

import { Badge } from "@/components/ui/badge";
import { STATUS_STYLES, type StatusTone } from "@/lib/os/status-utils";
import { cn } from "@/lib/utils";

export type { StatusTone } from "@/lib/os/status-utils";
export { statusToneFromInventory, statusToneFromPayment } from "@/lib/os/status-utils";

export function StatusBadge({
  label,
  tone = "muted",
  className,
}: {
  label: string;
  tone?: StatusTone;
  className?: string;
}) {
  return (
    <Badge variant="muted" className={cn("border-transparent", STATUS_STYLES[tone], className)}>
      {label}
    </Badge>
  );
}

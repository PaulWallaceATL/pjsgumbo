import { requireUser } from "@/lib/auth/session";
import { OsShell } from "@/components/os/os-shell";

/**
 * Restaurant OS shell. Auth is optional until `AUTH_ENABLED` is turned on.
 */
export default async function OsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  return <OsShell user={user}>{children}</OsShell>;
}

import { requireUser } from "@/lib/auth/session";
import { OsShell } from "@/components/os/os-shell";

/**
 * Restaurant OS shell. `requireUser` enforces authentication server-side
 * (Proxy provides the optimistic redirect). OsShell renders the sidebar
 * navigation, top bar, and sign-out.
 */
export default async function OsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  return <OsShell user={user}>{children}</OsShell>;
}

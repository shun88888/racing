import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { hasValidSession } from "@/lib/admin/require-session";

export default async function PrivateAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = await hasValidSession();
  if (!ok) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}

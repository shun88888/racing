import members from "@/content/members.json";
import type { Member } from "@/lib/data";
import { MembersEditor } from "@/components/admin/editors/MembersEditor";

export default function MembersPage() {
  return <MembersEditor initial={members as Member[]} />;
}

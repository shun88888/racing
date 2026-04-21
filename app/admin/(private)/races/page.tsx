import races from "@/content/races.json";
import type { Race } from "@/lib/data";
import { RacesEditor } from "@/components/admin/editors/RacesEditor";

export default function RacesPage() {
  return <RacesEditor initial={races as Race[]} />;
}

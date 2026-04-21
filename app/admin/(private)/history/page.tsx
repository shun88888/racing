import history from "@/content/history.json";
import type { HistoryEntry } from "@/lib/data";
import { HistoryEditor } from "@/components/admin/editors/HistoryEditor";

export default function HistoryPage() {
  return <HistoryEditor initial={history as HistoryEntry[]} />;
}

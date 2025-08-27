import { ClipboardList } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ClipboardList className="w-20 h-20 text-white/25 mb-4" />
      <p className="text-white/80 font-semibold">
        You don’t have any tasks registered yet.
      </p>
      <p className="mt-2 text-white/50">
        Create tasks and organize your to-do items.
      </p>
    </div>
  );
}

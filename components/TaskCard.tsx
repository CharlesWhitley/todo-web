// components/TaskCard.tsx
"use client";

import { Task } from "@/lib/types";
import { api } from "@/lib/api";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  task: Task;
  onChanged: () => void;
};

export default function TaskCard({ task, onChanged }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const toggleCompleted = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    try {
      await api.update(task.id, { completed: !task.completed });
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  const remove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (busy) return;
    const ok = confirm("Delete this task?");
    if (!ok) return;
    setBusy(true);
    try {
      await api.remove(task.id);
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/tasks/${task.id}`)}
      className="
        relative rounded-xl bg-white/5 ring-1 ring-white/10
        hover:ring-white/15 transition px-4 py-3 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
      "
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-1.5 rounded-l-xl"
        style={{ backgroundColor: task.color || "#3b82f6" }}
      />

      <div className="flex items-start gap-3">
        <button
          onClick={toggleCompleted}
          aria-checked={task.completed}
          role="checkbox"
          disabled={busy}
          className={`
            mt-1 h-5 w-5 rounded-full border-2 transition grid place-items-center
            ${task.completed ? "border-[#7777e1]" : "border-white/40 hover:border-white/60"}
          `}
        >
          <span
            className={`
              h-2.5 w-2.5 rounded-full transition
              ${task.completed ? "bg-[#7777e1]" : "bg-transparent"}
            `}
          />
        </button>

        <div className="flex-1">
          <div className="flex items-start gap-2">
            <span
              aria-hidden
              className="mt-2 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: task.color || "#3b82f6" }}
            />
            <p className={`text-sm leading-6 ${task.completed ? "text-white/50 line-through" : "text-white"}`}>
              {task.title}
            </p>
          </div>
        </div>

        <button
          aria-label="Delete task"
          onClick={remove}
          disabled={busy}
          className="p-1 rounded-md text-white/50 hover:text-white/80 hover:bg-white/5 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

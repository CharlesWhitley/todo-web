"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Task } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

// fetch and render list
export default function HomePage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const refresh = async () => setTasks(await api.list());
  useEffect(() => { refresh(); }, []);

  const total = tasks?.length ?? 0;
  const completed = tasks?.filter(t => t.completed).length ?? 0;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-0">
      <div className="space-y-6">
        <Link
          href="/tasks/new"
          className="
            flex items-center justify-center gap-2
            w-full      
            py-4 px-8                       
            text-lg font-semibold text-white
            rounded-2xl shadow-md
            bg-accent hover:opacity-90 transition
            text-center
            -mt-10
          "
        >
          <span>Create Task</span>
          <PlusCircle size={18} className="shrink-0 relative top-[1px]" />
        </Link>

      <div className="flex items-center justify-between text-base md:text-base font-medium text-white/80">
        <div className="flex items-center gap-2">
        <span className="text-[#489bc9]">Tasks</span>
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm md:text-sm">
            {total}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#7777e1]">Completed</span>
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm md:text-sm">
            {total === 0 ? completed : `${completed} of ${total}`}
          </span>
        </div>
      </div>

        {!tasks || tasks.length === 0 ? (
          <div className="mt-4">
          <div className="w-full border-t border-white/10 mb-8"></div>
          <EmptyState />
        </div>
        ) : (
          <div className="space-y-3">
            {tasks.map(t => (
              <TaskCard key={t.id} task={t} onChanged={refresh} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

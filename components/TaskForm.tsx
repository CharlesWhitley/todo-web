"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";
import type { Task } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { CheckCircle } from "lucide-react";

// predefined palette
const COLORS = ["#ef4444","#f59e0b","#eab308","#22c55e","#10b981","#3b82f6","#8b5cf6","#ec4899","#b38b64"];

// reused for create and edit
export default function TaskForm({ initial }: { initial?: Partial<Task> }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [color, setColor] = useState(initial?.color ?? COLORS[5]);
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (initial?.id) {
        await api.update(initial.id, { title, color });
      } else {
        await api.create({ title, color });
      }
      // go back to list and refresh data
      router.push("/");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-8 pt-10 md:pt-14">
      <div className="flex items-center gap-2 text-sm text-white/70 cursor-pointer" onClick={() => router.back()}>
        <ArrowLeft size={24} className="shrink-0 relative top-[0px] text-white" />
      </div>

      <div>
        <label className="text-sm text-white/70">Title</label>
        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Ex. Brush your teeth"
          className="w-full rounded-md border border-gray-600 bg-black/40 px-3 py-2 text-white placeholder-gray-400"
          required
        />
      </div>

      <div>
  <label className="block mb-2 text-sm text-white">Color</label>

    <div className="flex items-center gap-3 flex-wrap">
        {COLORS.map((c) => {
        const selected = c === color;
        return (
            <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            aria-label={`Choose color ${c}`}
            className={`
                h-12 w-12 rounded-full
                transition
                ${selected ? "ring-2 ring-white" : "hover:ring-2 hover:ring-white/30"}
            `}
            style={{ backgroundColor: c }}
            />
        );
        })}
    </div>
    </div>


    <button
        className="btn w-full flex items-center justify-center gap-2 text-white"
        disabled={saving}
        type="submit"
    >
        {initial?.id ? (
        <>
            <span className="text-white">Save</span>
            <CheckCircle size={18} className="text-white" />
        </>
        ) : (
        <>
            <span className="text-white">Add Task</span>
            <PlusCircle size={18} className="text-white" />
        </>
        )}
    </button>
    </form>
  );
}

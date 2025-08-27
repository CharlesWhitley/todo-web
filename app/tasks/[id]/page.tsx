// loads all tasks and finds the one by id
import TaskForm from "@/components/TaskForm";

async function getTask(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load tasks");
  const all = await res.json();
  return all.find((t: any) => t.id === id);
}

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const task = await getTask(Number(params.id));
  if (!task) return <p className="text-white/60">Task not found.</p>;
  return <TaskForm initial={task} />;
}

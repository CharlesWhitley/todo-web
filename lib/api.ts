// wrapper around fetch to talk to API
// makes it easy to swap base URLs
import { Task } from "./types";
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function json<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? (undefined as unknown as T) : (await res.json());
}

export const api = {
  list: () => json<Task[]>(`${BASE}/tasks`, { cache: "no-store" as any }),
  create: (data: Pick<Task, "title" | "color">) =>
    json<Task>(`${BASE}/tasks`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Pick<Task, "title" | "color" | "completed">>) =>
    json<Task>(`${BASE}/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: number) => json<void>(`${BASE}/tasks/${id}`, { method: "DELETE" })
};

import { Rocket } from "lucide-react";

export default function Header() {
    return (
      <header className="w-full bg-transparent">
        <div className="mx-auto max-w-3xl px-4 py-20 flex items-center justify-center">
          <h1 className="text-4xl font-semibold">
            <span className="inline-flex items-center gap-2">
              <span className="text-sky-400"><Rocket size={34} className="shrink-0 relative top-[2px]"/></span>
              <span className="text-[#4EA8DE]">Todo <span className="text-[#5E60CE]">App</span></span>
            </span>
          </h1>
        </div>
      </header>
    );
  }
  
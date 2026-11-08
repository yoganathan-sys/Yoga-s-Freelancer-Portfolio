import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center animate-pulse">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
      <p className="text-xs font-mono tracking-widest uppercase text-zinc-400">
        Loading Portfolio...
      </p>
    </div>
  );
}

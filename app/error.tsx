"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-red-950/40 border border-red-800 text-red-500 flex items-center justify-center shadow-2xl">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-black font-heading tracking-tight">Something went wrong</h1>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          An unexpected error occurred while rendering this page.
        </p>
      </div>
      <Button
        onClick={() => reset()}
        variant="heroWhite"
        size="lg"
        className="rounded-full font-bold gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}


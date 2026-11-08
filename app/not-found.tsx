import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500 shadow-2xl">
        <FileQuestion className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black font-heading tracking-tight">404 — Page Not Found</h1>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          The requested page or case study does not exist or may have been updated.
        </p>
      </div>
      <Button asChild variant="heroWhite" size="lg" className="rounded-full font-bold">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </Button>
    </div>
  );
}


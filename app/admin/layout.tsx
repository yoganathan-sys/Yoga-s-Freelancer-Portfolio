import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Home,
  LogOut,
  Shield,
  Layers,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm tracking-wide text-white uppercase">
                Admin Console
              </h2>
              <span className="text-[10px] font-mono text-zinc-400">
                Yoganathan A Portfolio
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 font-medium text-sm">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/projects"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <FolderKanban className="w-4 h-4 text-emerald-400" />
              <span>Projects</span>
            </Link>

            <Link
              href="/admin/messages"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Inquiries</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out / Switch</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Mail,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  Eye,
  Filter,
  AlertCircle,
  RotateCw,
  Loader2,
} from "lucide-react";
import { ContactMessage, InquiryStatus } from "@/types";
import {
  updateMessageStatusAction,
  deleteMessageAction,
  retryNotificationEmailAction,
} from "@/actions/admin";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MessagesManagerProps {
  initialMessages: ContactMessage[];
}

export function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [retryFeedback, setRetryFeedback] = useState<{ id: string; success: boolean; message: string } | null>(null);

  const filtered =
    statusFilter === "all"
      ? messages
      : messages.filter((m) => m.status === statusFilter);

  const handleUpdateStatus = async (id: string, newStatus: InquiryStatus) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
    await updateMessageStatusAction(id, newStatus);
  };

  const handleDelete = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setDeleteId(null);
    await deleteMessageAction(id);
  };

  const handleRetryEmail = async (id: string) => {
    setRetryingId(id);
    setRetryFeedback(null);
    try {
      const res = await retryNotificationEmailAction(id);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id
              ? { ...m, notification_status: "sent", notification_error: null }
              : m
          )
        );
        setRetryFeedback({
          id,
          success: true,
          message: "Email notification dispatched successfully to yoganathan162008@gmail.com!",
        });
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id
              ? {
                  ...m,
                  notification_status: "failed",
                  notification_error: res.error || "Resend notification failed",
                }
              : m
          )
        );
        setRetryFeedback({
          id,
          success: false,
          message: res.error || "Retry failed. Verify RESEND_API_KEY in .env.local",
        });
      }
    } catch (err: any) {
      setRetryFeedback({
        id,
        success: false,
        message: err?.message || "Failed to retry email dispatch.",
      });
    } finally {
      setRetryingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-heading tracking-tight text-white">
            Client Inquiries
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Review incoming leads, update response workflows, or delete spam messages.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {["all", "unread", "read", "replied", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-md space-y-4 hover:border-zinc-700 transition-colors"
          >
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  {msg.full_name[0] || "U"}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    {msg.full_name}
                  </h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-blue-400 hover:underline font-mono"
                  >
                    {msg.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-500">
                  {formatDate(msg.created_at)}
                </span>
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                    msg.status === "unread"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : msg.status === "replied"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {msg.status}
                </span>

                {/* Resend Email Notification Status Badge */}
                {msg.notification_status === "sent" ? (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Email Sent</span>
                  </span>
                ) : msg.notification_status === "failed" ? (
                  <span
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 flex items-center gap-1"
                    title={msg.notification_error || "Email delivery failed"}
                  >
                    <AlertCircle className="w-3 h-3 text-red-400" />
                    <span>Email Failed</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Email Pending</span>
                  </span>
                )}
              </div>
            </div>

            {/* Scope / Budget tags */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-blue-400">
                Type: {msg.project_type}
              </span>
              {msg.budget_range && (
                <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-emerald-400">
                  Budget: {msg.budget_range}
                </span>
              )}
            </div>

            {/* Description Body */}
            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-850 whitespace-pre-wrap">
              {msg.project_description}
            </p>

            {/* Notification Delivery Error / Feedback */}
            {msg.notification_status === "failed" && msg.notification_error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-red-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <div>
                  <span className="font-semibold text-red-200">Resend Delivery Error: </span>
                  <span>{msg.notification_error}</span>
                </div>
              </div>
            )}

            {retryFeedback && retryFeedback.id === msg.id && (
              <div
                className={`flex items-start gap-2 p-3 rounded-xl text-xs font-mono ${
                  retryFeedback.success
                    ? "bg-emerald-950/30 border border-emerald-900/40 text-emerald-300"
                    : "bg-red-950/30 border border-red-900/40 text-red-300"
                }`}
              >
                {retryFeedback.success ? (
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                )}
                <span>{retryFeedback.message}</span>
              </div>
            )}

            {/* Status change actions & Email actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500">Mark as:</span>
                <button
                  onClick={() => handleUpdateStatus(msg.id, "read")}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                >
                  Read
                </button>
                <button
                  onClick={() => handleUpdateStatus(msg.id, "replied")}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition-colors"
                >
                  Replied
                </button>
                <button
                  onClick={() => handleUpdateStatus(msg.id, "archived")}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
                >
                  Archive
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {msg.notification_status !== "sent" && (
                  <Button
                    onClick={() => handleRetryEmail(msg.id)}
                    disabled={retryingId === msg.id}
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-xl border-amber-500/40 text-amber-300 hover:bg-amber-500/10 text-xs font-mono gap-1.5"
                    title="Retry dispatching notification email via Resend"
                  >
                    {retryingId === msg.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Retrying...</span>
                      </>
                    ) : (
                      <>
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Retry Email</span>
                      </>
                    )}
                  </Button>
                )}

                <a
                  href={`mailto:${msg.email}?subject=Re: Your Project Inquiry - ${msg.project_type}`}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <Button
                  onClick={() => setDeleteId(msg.id)}
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40"
                  title="Delete message"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
            <Mail className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white font-heading">
              No inquiries found
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-mono">
              There are no messages matching this status filter.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Delete Inquiry?</h3>
            <p className="text-xs text-zinc-400">
              Are you sure you want to delete this message? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                onClick={() => setDeleteId(null)}
                variant="outline"
                size="sm"
                className="rounded-xl border-zinc-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteId)}
                variant="destructive"
                size="sm"
                className="rounded-xl"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


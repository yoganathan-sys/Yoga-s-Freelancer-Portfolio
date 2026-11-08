import { getContactMessagesAdmin } from "@/lib/messages";
import { MessagesManager } from "@/components/admin/messages-manager";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getContactMessagesAdmin();

  return <MessagesManager initialMessages={messages} />;
}


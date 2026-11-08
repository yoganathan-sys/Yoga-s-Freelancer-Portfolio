import { getAllProjectsAdmin } from "@/lib/projects";
import { ProjectManager } from "@/components/admin/project-manager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  return <ProjectManager initialProjects={projects} />;
}

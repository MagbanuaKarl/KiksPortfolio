import { getPublicProjects } from "@/lib/publicProjects.server";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";

export default async function ProjectsPage() {  
  const projects = (await getPublicProjects()).sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <ProjectsPageClient projects={projects} featuredCount={featuredCount} />
  );
}
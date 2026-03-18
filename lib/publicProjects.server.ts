import { adminFirestore } from "@/lib/firebaseAdmin";
import type { Project } from "@/types/projects";

export async function getPublicProjects(): Promise<Project[]> {
  const q = adminFirestore
    .collection("projects")
    .orderBy("createdAt", "desc");

  const snapshot = await q.get();

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    const createdAt = data.createdAt;

    return {
      id: docSnap.id,
      title: data.title ?? "",
      description: data.description ?? "",
      techStack: Array.isArray(data.techStack) ? data.techStack : [],
      githubUrl: data.githubUrl ?? undefined,
      liveUrl: data.liveUrl ?? undefined,
      featured: Boolean(data.featured),
      createdAt:
        createdAt && typeof createdAt === "object" && "toDate" in createdAt
          ? createdAt.toDate().toISOString()
          : null,
    } as Project;
  });
}


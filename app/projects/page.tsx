"use client";

import { useEffect, useState } from "react";
import { getPublicProjects } from "@/lib/publicProjects";
import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProjects()
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-8">Loading projects...</p>;
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {projects.length === 0 && (
        <p>No projects yet. Check back soon.</p>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">
              {project.title}
            </h2>

            <p className="text-gray-700 mt-2">
              {project.description}
            </p>

            {project.techStack.length > 0 && (
              <p className="mt-2 text-sm">
                <strong>Tech:</strong>{" "}
                {project.techStack.join(", ")}
              </p>
            )}

            <div className="mt-3 flex gap-4 text-sm">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  className="underline"
                >
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  className="underline"
                >
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

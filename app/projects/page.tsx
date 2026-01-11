"use client";

import { useEffect, useState } from "react";
import { getPublicProjects } from "@/lib/publicProjects";
import { Project } from "@/types/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProjects()
      .then((data) =>
        setProjects(
          data.sort((a, b) => Number(b.featured) - Number(a.featured))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-8">Loading projects...</p>;
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {projects.length === 0 && <p>No projects yet. Check back soon.</p>}

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border-l-4 border-gray-200 p-4">
            <h2 className="text-xl font-semibold">
              {project.title}
              {project.featured && (
                <span className="ml-2 text-sm text-gray-500">★ Featured</span>
              )}
            </h2>

            <p className="text-gray-700 mt-2 whitespace-pre-line">
              {project.description.split("\n")[0]}
            </p>

            {project.description.includes("\n") && (
              <details className="mt-2 text-sm text-gray-600">
                <summary className="cursor-pointer">Read more</summary>
                <p className="mt-2 whitespace-pre-line">
                  {project.description}
                </p>
              </details>
            )}

            {project.techStack?.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                <strong>Tech:</strong> {project.techStack.join(" · ")}
              </p>
            )}

            <div className="mt-3 flex gap-4 text-sm">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  GitHub →
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Live →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

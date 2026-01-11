"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/profile";
import { getPublicProjects } from "@/lib/publicProjects";
import { Project } from "@/types/project";

export default function HomePage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProfile().then(setProfile);
    getPublicProjects().then((data) =>
      setProjects(data.filter((p) => p.featured))
    );
  }, []);

  if (!profile) return <p className="p-8">Loading...</p>;
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Name and Role */}
      <h1 className="text-4xl font-bold">{profile.name}</h1>
      <p className="text-xl mt-2">{profile.role}</p>

      {/* Summary */}
      <p className="mt-6 text-gray-700 max-w-2xl">{profile.summary}</p>

      {/* Proof Section */}
      <p className="mt-4 text-gray-700 max-w-2xl">{profile.proof}</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Featured Projects</h2>

        {projects.map((project) => (
          <div
            key={project.id}
            className="mb-6 border-l-4 border-gray-200 pl-4"
          >
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <p className="text-gray-700 mt-1">{project.description}</p>

            <div className="mt-2 flex gap-4 text-sm">
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
      </section>

      <section className="mt-12 flex gap-6">
        <a
          href="/projects"
          className="font-medium text-blue-600 hover:underline"
        >
          View All Projects →
        </a>

        <a
          href={profile.github}
          target="_blank"
          className="font-medium text-blue-600 hover:underline"
        >
          GitHub →
        </a>

        <a
          href={profile.resumeUrl}
          target="_blank"
          className="font-medium text-blue-600 hover:underline"
        >
          Download Resume →
        </a>
      </section>
    </main>
  );
}

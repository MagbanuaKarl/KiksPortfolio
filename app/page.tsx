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
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">{profile.name}</h1>
      <p className="text-xl mt-2">{profile.role}</p>
      <p className="mt-4 text-gray-700">{profile.summary}</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">
          Featured Projects
        </h2>

        {projects.map((project) => (
          <div key={project.id} className="mb-4">
            <h3 className="font-bold">{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

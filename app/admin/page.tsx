"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addProject, deleteProject, getProjects } from "@/lib/projects";
import { Project } from "@/types/project";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const data = await getProjects();
    setProjects(data);
  }

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();

    await addProject({
      title,
      description,
      techStack: [],
      featured: false,
    });

    setTitle("");
    setDescription("");
    loadProjects();
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    await deleteProject(id);
    loadProjects();
  }

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) return null;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin — Projects</h1>

      <form onSubmit={handleAddProject} className="mb-6 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="bg-black text-white px-4 py-2">
          Add Project
        </button>
      </form>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className="border p-3 flex justify-between items-center"
          >
            <span>{project.title}</span>
            <button
              className="text-red-600"
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

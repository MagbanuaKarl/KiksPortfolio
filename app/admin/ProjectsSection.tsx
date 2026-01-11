"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/projects";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "@/lib/projects";
import ProjectTable from "./ProjectTable";
import ProjectFormModal from "./ProjectFormModal";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  function openCreate() {
    setEditingProject(null);
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditingProject(project);
    setModalOpen(true);
  }

  async function handleSave(data: Omit<Project, "id">) {
    if (editingProject) {
      await updateProject(editingProject.id!, data);
    } else {
      await addProject(data);
    }
    setModalOpen(false);
    refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    refresh();
  }

  async function toggleFeatured(project: Project) {
    await updateProject(project.id!, {
      ...project,
      featured: !project.featured,
    });
    refresh();
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Projects</h2>
        <button
          onClick={openCreate}
          className="bg-black text-white px-4 py-2"
        >
          + New Project
        </button>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <ProjectTable
          projects={projects}
          onEdit={openEdit}
          onDelete={handleDelete}
          onToggleFeatured={toggleFeatured}
        />
      )}

      {modalOpen && (
        <ProjectFormModal
          initial={editingProject ?? undefined}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}

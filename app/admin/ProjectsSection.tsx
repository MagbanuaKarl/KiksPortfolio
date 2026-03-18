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

  async function refresh() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, []);

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
    <section className="space-y-6 sm:space-y-8">
      <div className="card card--section">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Projects
              </h2>
              <p className="text-sm sm:text-base text-secondary mt-1">
                Manage your portfolio projects
              </p>
            </div>
            <button
              onClick={openCreate}
              className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <svg
                className="w-5 h-5 sm:mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="hidden sm:inline">New Project</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-4">
            <div className="card card--section">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[color:var(--color-border-subtle)] border-t-[color:var(--color-primary)] rounded-full animate-spin"></div>
                </div>
                <p className="text-sm sm:text-base text-secondary font-medium">
                  Loading projects...
                </p>
              </div>
            </div>
          </div>
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
      </div>
    </section>
  );
}
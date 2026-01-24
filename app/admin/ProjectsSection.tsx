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
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Projects
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Loading projects...</p>
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
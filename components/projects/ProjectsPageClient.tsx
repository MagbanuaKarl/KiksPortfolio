"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/projects";

type ClientProps = {
  projects: Project[];
  featuredCount: number;
};

export function ProjectsPageClient({ projects, featuredCount }: ClientProps) {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const filteredProjects = projects.filter((p) =>
    filter === "all" ? true : p.featured
  );

  return (
    <main className="page-shell">
      <div className="page-shell__inner space-y-8 sm:space-y-10">
        {/* Header Section */}
        <div className="card card--section animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-200 dark:to-purple-300 bg-clip-text text-transparent mb-3">
                All Projects
              </h1>
              <p className="text-base sm:text-lg text-secondary">
                Explore {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"} I&apos;ve worked on
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 bg-[color:var(--color-surface-soft)] p-1 rounded-full w-fit border border-[color:var(--color-border-subtle)]/70">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                  filter === "all"
                    ? "bg-[color:var(--color-surface)] text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setFilter("featured")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                  filter === "featured"
                    ? "bg-[color:var(--color-surface)] text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                Featured ({featuredCount})
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="card card--section text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-semibold text-primary mb-1">
              {filter === "featured" ? "No featured projects" : "No projects yet"}
            </h3>
            <p className="text-secondary">
              {filter === "featured"
                ? "Try viewing all projects instead"
                : "Check back soon for updates!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


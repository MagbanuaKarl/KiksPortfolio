"use client";

import { Project } from "@/types/projects";

type Props = {
  projects: Project[];
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (p: Project) => void;
};

export default function ProjectTable({
  projects,
  onEdit,
  onDelete,
  onToggleFeatured,
}: Props) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Title</th>
          <th className="p-2">Tech</th>
          <th className="p-2">Featured</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="p-2">{p.title}</td>
            <td className="p-2">{p.techStack.join(", ")}</td>
            <td className="p-2 text-center">
              <input
                type="checkbox"
                checked={p.featured}
                onChange={() => onToggleFeatured(p)}
              />
            </td>
            <td className="p-2 space-x-2">
              <button
                className="text-blue-600"
                onClick={() => onEdit(p)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => onDelete(p.id!)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

"use client";

import { useState } from "react";
import { Project } from "@/types/projects";

type Props = {
  initial?: Project;
  onSave: (data: Omit<Project, "id">) => void;
  onClose: () => void;
};

export default function ProjectFormModal({ initial, onSave, onClose }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [techStack, setTechStack] = useState(
    initial?.techStack.join(", ") ?? ""
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      title,
      description,
      techStack: techStack.split(",").map(t => t.trim()),
      featured: initial?.featured ?? false,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-6 space-y-4 w-full max-w-md"
      >
        <h3 className="text-lg font-bold">
          {initial ? "Edit Project" : "New Project"}
        </h3>

        <input
          className="border p-2 w-full"
          placeholder="Title"
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

        <input
          className="border p-2 w-full"
          placeholder="Tech stack (comma separated)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-black text-white px-4 py-2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

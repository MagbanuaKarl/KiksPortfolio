"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/profile";

type Profile = {
  name: string;
  role: string;
  summary: string;
  proof: string;
  skills: string[];
  github: string;
  linkedin: string;
  resumeUrl: string;
};

type Props = {
  profile: Profile;
  onSave: (profile: Profile) => void;
};

export default function ProfileForm({ profile, onSave }: Props) {
  const [form, setForm] = useState({
    ...profile,
    skills: profile.skills.join(", "),
  });

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const updatedProfile: Profile = {
      ...profile,
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    await updateProfile(updatedProfile);
    onSave(updatedProfile);
  }

  return (
    <form onSubmit={submit} className="space-y-4 max-w-3xl">
      <Input label="Name" value={form.name} onChange={(v) => updateField("name", v)} />
      <Input label="Role" value={form.role} onChange={(v) => updateField("role", v)} />
      <Textarea label="Summary" value={form.summary} onChange={(v) => updateField("summary", v)} />
      <Textarea label="Proof" value={form.proof} onChange={(v) => updateField("proof", v)} />
      <Input label="Skills (comma separated)" value={form.skills} onChange={(v) => updateField("skills", v)} />
      <Input label="GitHub" value={form.github} onChange={(v) => updateField("github", v)} />
      <Input label="LinkedIn" value={form.linkedin} onChange={(v) => updateField("linkedin", v)} />
      <Input label="Resume URL" value={form.resumeUrl} onChange={(v) => updateField("resumeUrl", v)} />

      <button className="bg-black text-white px-4 py-2">
        Save Profile
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="border p-2 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        className="border p-2 w-full"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

"use client";

import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { getProfile, updateProfile } from "@/lib/profile";
import { Profile } from "@/types/profile";

export default function ProfileSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Profile</h2>
        <button
          className="border px-3 py-1"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {!editing ? (
        <dl className="space-y-2">
          <ProfileRow label="Name" value={profile.name} />
          <ProfileRow label="Role" value={profile.role} />
          <ProfileRow label="Summary" value={profile.summary} />
          <ProfileRow label="Proof" value={profile.proof} />
          <ProfileRow label="Skills" value={profile.skills.join(", ")} />
          <ProfileRow label="GitHub" value={profile.github} />
          <ProfileRow label="LinkedIn" value={profile.linkedin} />
          <ProfileRow label="Resume" value={profile.resumeUrl} />
        </dl>
      ) : (
        <ProfileForm 
          profile={profile} 
          onSave={(updatedProfile) => {
            setProfile(updatedProfile);
            setEditing(false);
          }} 
        />
      )}
    </section>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <dt className="font-medium">{label}</dt>
      <dd className="col-span-3 text-gray-700">{value}</dd>
    </div>
  );
}
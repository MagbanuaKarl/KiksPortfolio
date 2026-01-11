"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileSection from "./ProfileSection";
import ProjectsSection from "./ProjectsSection";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-16">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Profile management */}
      {/* <ProfileSection /> */}

      {/* Projects management */}
      <ProjectsSection />
    </main>
  );
}

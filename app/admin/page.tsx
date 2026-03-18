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
    return (
      <div className="page-shell flex items-center justify-center">
        <div className="page-shell__inner">
          <div className="card card--section flex items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-14 h-14 border-4 border-[color:var(--color-border-subtle)] border-t-[color:var(--color-primary)] rounded-full animate-spin" />
              </div>
              <p className="text-sm sm:text-base text-secondary font-medium">
                Loading dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="page-shell">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="card card--section animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base text-secondary mt-2">
                Welcome back, {user.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50/70 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-[color:var(--color-border-subtle)]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            label="Profile"
            value="Complete"
            color="from-blue-500 to-purple-600"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            }
            label="Projects"
            value="Manage"
            color="from-green-500 to-teal-600"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            label="Status"
            value="Online"
            color="from-orange-500 to-red-600"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label="Last Updated"
            value="Today"
            color="from-pink-500 to-purple-600"
          />
        </div>

        {/* Profile Section */}
        <ProfileSection />

        {/* Projects Section */}
        <ProjectsSection />
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="card card--section card--interactive p-6">
      <div className="flex items-center gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-secondary truncate">
            {label}
          </p>
          <p className="text-lg font-semibold text-primary truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
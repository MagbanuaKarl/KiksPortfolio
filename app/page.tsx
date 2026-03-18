import { getProfile } from "@/lib/profile.server";
import { getPublicProjects } from "@/lib/publicProjects.server";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default async function HomePage() {
  const [profile, allProjects] = await Promise.all([
    getProfile(),
    getPublicProjects(),
  ]);

  if (!profile) return null;

  const projects = allProjects.filter((p) => p.featured);
  const allSkills = new Set<string>([
    ...(profile.skills ?? []),
    ...allProjects.flatMap((p) => p.techStack ?? []),
  ]);
  const ribbonSkills = Array.from(allSkills).slice(0, 18);

  return (
    <main className="page-shell">
      <div className="page-shell__inner space-y-8 sm:space-y-10">
        {/* Hero Section */}
        <section className="card card--section animate-fade-in-up">
          <div className="max-w-4xl">
            {/* Name with gradient */}
            <h1 className="heading-hero bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-200 dark:to-purple-300 bg-clip-text text-transparent mb-4">
              {profile.name}
            </h1>
            
            {/* Role with icon */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl text-primary font-medium">
                {profile.role}
              </p>
            </div>

            {/* Summary */}
            <p className="text-base sm:text-lg text-secondary leading-relaxed mb-6">
              {profile.summary}
            </p>

            {/* Proof/Highlight */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50/80 dark:from-slate-900 dark:to-slate-800 border-l-4 border-blue-500/80 rounded-r-xl p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[color:var(--color-primary)] flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-primary leading-relaxed">{profile.proof}</p>
              </div>
            </div>

            {/* Skills Tags */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-semibold tracking-wide text-secondary uppercase mb-3">
                  Core skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-border-subtle)]/80 shadow-sm hover:shadow-md transition-all duration-150 hover:-translate-y-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 mt-8">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-soft)] text-secondary hover:text-primary hover:border-[color:var(--color-border-strong)] hover:shadow-md transition-all duration-150"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-soft)] text-secondary hover:text-primary hover:border-[color:var(--color-border-strong)] hover:shadow-md transition-all duration-150"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-150 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              )}
            </div>

            {/* Tech stack ribbon */}
            {ribbonSkills.length > 0 && (
              <div className="mt-10 border-t border-[color:var(--color-border-subtle)] pt-4">
                <div className="mono-accent mb-2 text-secondary">
                  Tech stack
                </div>
                <div className="relative -mx-2">
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[var(--color-surface)] to-transparent" />
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[var(--color-surface)] to-transparent" />
                  <div className="flex gap-3 overflow-x-auto no-scrollbar px-2 py-1">
                    {ribbonSkills.map((skill) => (
                      <span
                        key={skill}
                        className="pill border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-soft)]/80 px-3 py-1 text-xs text-secondary whitespace-nowrap hover:border-[color:var(--color-border-strong)] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bento grid: capabilities overview */}
        <section className="grid gap-4 sm:gap-5 lg:gap-6 md:grid-cols-6">
          <div className="card card--section md:col-span-3 lift">
            <h2 className="heading-section mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              High‑performance web systems
            </h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed mb-4">
              I design and ship production systems with clear boundaries,
              predictable performance, and observability from day one.
            </p>
            <ul className="space-y-2 text-sm text-secondary">
              <li>• API‑driven architectures with clean separation of concerns</li>
              <li>• Caching, pagination, and querying strategies for real data</li>
              <li>• DX‑focused tooling, CI, and code review practices</li>
            </ul>
          </div>

          <div className="card card--section md:col-span-3 lift">
            <h3 className="mono-accent text-[color:var(--color-tag-frontend)] mb-1">
              Frontend / UX engineering
            </h3>
            <p className="text-sm text-secondary mb-3">
              Modern React, Next.js, and calm UX patterns.
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(allSkills)
                .filter((s) =>
                  /react|next|tailwind|typescript|js|ts/i.test(s)
                )
                .slice(0, 8)
                .map((skill) => (
                  <span
                    key={skill}
                    className="pill bg-[color:var(--color-primary-soft)]/70 text-[color:var(--color-primary)] border border-[color:var(--color-border-subtle)] px-3 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          <div className="card card--section md:col-span-2 lift">
            <h3 className="mono-accent text-[color:var(--color-tag-backend)] mb-1">
              Backend & data
            </h3>
            <p className="text-sm text-secondary">
              Firebase / Firestore, REST APIs, and data modeling for
              real‑world usage rather than toy demos.
            </p>
          </div>

          <div className="card card--section md:col-span-2 lift">
            <h3 className="mono-accent text-[color:var(--color-tag-database)] mb-1">
              Tooling & quality
            </h3>
            <p className="text-sm text-secondary">
              TypeScript, linting, and opinionated structure to keep projects
              maintainable as they grow.
            </p>
          </div>

          <div className="card card--section md:col-span-2 lift">
            <h3 className="mono-accent text-secondary mb-1">
              Currently focused on
            </h3>
            <p className="text-sm text-secondary">
              Better developer experience, calm interactions, and portfolio‑
              ready case studies instead of generic templates.
            </p>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="space-y-6 animate-fade-in-up-delayed">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-sm sm:text-base text-secondary mt-1">
                Showcasing my best work
              </p>
            </div>
            <a
              href="/projects"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)]/80 hover:bg-[color:var(--color-primary-soft)] border border-[color:var(--color-border-subtle)] transition-colors duration-150"
            >
              View All
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>

          {projects.length === 0 && (
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
                No featured projects yet
              </h3>
              <p className="text-secondary">Check back soon for updates!</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
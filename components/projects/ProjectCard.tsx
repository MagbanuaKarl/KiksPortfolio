import type { Project } from "@/types/projects";

type Props = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact }: Props) {
  return (
    <article className="card card--section card--interactive lift p-6 group">
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
          {project.title.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-primary group-hover:text-[color:var(--color-primary)] transition-colors truncate">
            {project.title}
          </h3>
        </div>
      </header>

      <p
        className={`text-secondary leading-relaxed ${
          compact ? "line-clamp-3" : ""
        } mb-4`}
      >
        {project.description}
      </p>

      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-border-subtle)]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <footer className="flex gap-3 pt-4 border-t border-[color:var(--color-border-subtle)]">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-secondary hover:text-[color:var(--color-primary)] transition-colors"
          >
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-[color:var(--color-primary)] hover:text-blue-700 transition-colors"
          >
            Live Demo
          </a>
        )}
      </footer>
    </article>
  );
}


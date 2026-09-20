// Single source of truth for the project pages: drives each page's <title> and
// description as well as the label in the fixed header bar.
export const projects = {
  monitr: {
    title: "Monitr",
    years: "2021-2023",
    description:
      "Founding Monitr, a real-time e-commerce monitoring platform tracking inventory across 200+ retailers.",
  },
  wrath: {
    title: "Wrath",
    years: "2018-2021",
    description:
      "Building Wrath, an invite-only checkout automation platform for limited sneaker releases.",
  },
} as const;

export type ProjectSlug = keyof typeof projects;

export function isProjectSlug(slug: string): slug is ProjectSlug {
  return slug in projects;
}

export function projectHeading(slug: ProjectSlug): string {
  const { title, years } = projects[slug];
  return `${title} (${years})`;
}

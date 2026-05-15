/** Shared with `app/academics/page.tsx` section & card ids */

export function academicItemHref(sectionId: string, itemLabel: string) {
  const slug = itemLabel.toLowerCase().replace(/\s+/g, "-");
  return `/academics#${sectionId}-${slug}`;
}

export function academicSectionHref(sectionId: string) {
  return `/academics#${sectionId}`;
}

export const academicsMenuGroups = [
  { label: "Boards", sectionId: "boards", items: ["Primary", "Secondary"] },
  { label: "Languages", sectionId: "languages", items: ["French", "Spanish", "German", "Italian", "Japanese"] },
  { label: "Life Skills", sectionId: "life-skills", items: ["Public speaking", "Communication skills", "Social skills"] },
  {
    label: "Competitive",
    sectionId: "competitive",
    items: ["Olympiad", "Robotics", "Scholarship Exams", "Interschool Quizzes"],
  },
];

/** Desktop hover panel + mobile quick links */
export const academicsNavLinks = [
  { href: "/academics#grades", label: "Grades 3–12", desc: "Learning bands and subject focus" },
  { href: "/academics#pathway", label: "Board & accreditation", desc: "International pathway · IA 441" },
  { href: "/academics#talent", label: "Talent farming", desc: "Grow strengths with structure" },
  ...academicsMenuGroups.flatMap((group) => [
    {
      href: academicSectionHref(group.sectionId),
      label: group.label,
      desc: group.items.join(" · "),
    },
    ...group.items.map((item) => ({
      href: academicItemHref(group.sectionId, item),
      label: item,
      desc: group.label,
    })),
  ]),
];

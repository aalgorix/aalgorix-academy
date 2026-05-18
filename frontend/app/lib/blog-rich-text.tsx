import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Block, Document, Inline } from "@contentful/rich-text-types";
import type { ReactNode } from "react";

export const blogRichTextRenderOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => (
      <h1 className="mb-6 mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
      <h2 className="mb-4 mt-8 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white/95 md:text-3xl">
        {children}
      </h2>
    ),
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
      <p className="mb-4 leading-relaxed text-slate-600 dark:text-white/65">{children}</p>
    ),
    [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
      <blockquote className="my-6 border-l-4 border-slate-900/80 bg-slate-50 py-4 pl-5 pr-4 italic text-slate-700 dark:border-white/30 dark:bg-white/5 dark:text-white/75">
        {children}
      </blockquote>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
      <ul className="my-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-white/65">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-slate-600 dark:text-white/65">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => (
      <li className="leading-relaxed">{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const uri = typeof node.data.uri === "string" ? node.data.uri : "#";
      return (
      <a
        href={uri}
        className="font-medium text-slate-900 underline decoration-slate-400 underline-offset-4 transition-colors hover:text-sky-700 hover:decoration-sky-600 dark:text-white/90 dark:decoration-white/30 dark:hover:text-sky-300 dark:hover:decoration-sky-400"
        target={uri.startsWith("http") ? "_blank" : undefined}
        rel={uri.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
      );
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => (
      <strong className="font-semibold text-slate-900 dark:text-white/90">{text}</strong>
    ),
  },
};

export function BlogRichText({ document }: { document: Document }) {
  return (
    <article className="blog-rich-text max-w-none">
      {documentToReactComponents(document, blogRichTextRenderOptions)}
    </article>
  );
}

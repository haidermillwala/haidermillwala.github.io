"use client";

import { MDXProvider } from "@mdx-js/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <MDXProvider>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ className, ...props }) => (
            <h1
              className={cn(
                "mb-4 text-balance text-3xl font-semibold tracking-normal text-white sm:text-4xl",
                className
              )}
              {...props}
            />
          ),
          h2: ({ className, ...props }) => (
            <h2
              className={cn(
                "mb-3 mt-8 border-b border-slate-800 pb-2 text-xl font-semibold text-slate-100",
                className
              )}
              {...props}
            />
          ),
          h3: ({ className, ...props }) => (
            <h3
              className={cn("mb-2 mt-5 text-base font-semibold text-teal-200", className)}
              {...props}
            />
          ),
          p: ({ className, ...props }) => (
            <p className={cn("mb-4 leading-7 text-slate-300", className)} {...props} />
          ),
          ul: ({ className, ...props }) => (
            <ul
              className={cn("mb-5 ml-5 list-disc space-y-2 text-slate-300", className)}
              {...props}
            />
          ),
          ol: ({ className, ...props }) => (
            <ol
              className={cn("mb-5 ml-5 list-decimal space-y-2 text-slate-300", className)}
              {...props}
            />
          ),
          li: ({ className, ...props }) => (
            <li className={cn("pl-1 leading-7", className)} {...props} />
          ),
          strong: ({ className, ...props }) => (
            <strong className={cn("font-semibold text-slate-100", className)} {...props} />
          ),
          code: ({ className, children, ...props }) => (
            <code
              className={cn(
                "rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[0.9em] text-amber-200",
                className
              )}
              {...props}
            >
              {children}
            </code>
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote
              className={cn(
                "mb-5 border-l-2 border-teal-300/80 pl-4 text-slate-300",
                className
              )}
              {...props}
            />
          ),
          a: ({ className, ...props }) => (
            <a
              className={cn("text-teal-200 underline-offset-4 hover:underline", className)}
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          table: ({ className, ...props }) => (
            <div className="mb-5 overflow-x-auto">
              <table className={cn("w-full min-w-[520px] text-left text-sm", className)} {...props} />
            </div>
          ),
          th: ({ className, ...props }) => (
            <th
              className={cn("border-b border-slate-700 px-3 py-2 text-slate-100", className)}
              {...props}
            />
          ),
          td: ({ className, ...props }) => (
            <td
              className={cn("border-b border-slate-800 px-3 py-2 text-slate-300", className)}
              {...props}
            />
          ),
          em: ({ children }) => <Badge>{children}</Badge>
        }}
      >
        {content}
      </ReactMarkdown>
    </MDXProvider>
  );
}

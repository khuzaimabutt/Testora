import { cn } from "@/lib/utils";
import React from "react";

/* Shared empty state: a blank ruled answer sheet with a clear next step. */
export default function EmptyState({
  title,
  body,
  children,
  className,
}: {
  title: string;
  body: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-dashed border-input bg-card", className)}>
      <div aria-hidden className="bg-ruled absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute inset-y-0 left-10 w-px bg-mark/30 sm:left-16" />
      <div className="relative flex flex-col items-start gap-4 py-12 pl-16 pr-6 sm:py-16 sm:pl-24 sm:pr-12">
        <h3 className="max-w-lg text-2xl font-semibold">{title}</h3>
        <p className="max-w-lg leading-relaxed text-muted-foreground">{body}</p>
        {children && <div className="mt-2 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  );
}

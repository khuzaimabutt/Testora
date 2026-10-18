import Link from "next/link";
import { cn } from "@/lib/utils";

/* Wordmark: an open answer booklet with a red-pen tick. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("h-8 w-8", className)}>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="hsl(var(--primary))" />
      <path d="M8 10.5c2.6-.9 5.3-.6 8 1v11c-2.7-1.6-5.4-1.9-8-1z" fill="hsl(var(--primary-foreground))" opacity=".92" />
      <path d="M24 10.5c-2.6-.9-5.3-.6-8 1v11c2.7-1.6 5.4-1.9 8-1z" fill="hsl(var(--primary-foreground))" opacity=".7" />
      <path d="M17.5 17.2l2.4 2.4 5.6-6.4" fill="none" stroke="hsl(var(--mark))" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Brand({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5 rounded-md", className)} aria-label="CertiAI home">
      <BrandMark />
      <span className="font-display text-xl font-semibold tracking-tight">
        Certi<span className="text-mark">AI</span>
      </span>
    </Link>
  );
}

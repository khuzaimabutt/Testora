import React from "react";
import Brand from "@/components/common/Brand";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div aria-hidden className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_31px,currentColor_31px,currentColor_32px)]" />
        <div aria-hidden className="absolute inset-y-0 left-24 w-px bg-mark/60" />
        <div className="relative [&_span]:text-primary-foreground [&_.text-mark]:!text-mark">
          <Brand />
        </div>
        <div className="relative max-w-md">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground/70">Before you begin</p>
          <p className="mt-4 font-display text-4xl leading-tight">
            Read each question carefully. <span className="italic text-[hsl(8_80%_72%)]">Then show what you know.</span>
          </p>
          <ul className="mt-10 space-y-3 text-primary-foreground/80">
            <li>Teachers: author, price and publish timed tests.</li>
            <li>Students: practise against the clock and review the marking.</li>
          </ul>
        </div>
        <p className="relative text-sm text-primary-foreground/70">Secure sign in is handled by Clerk.</p>
      </aside>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
        <div className="lg:hidden">
          <Brand />
        </div>
        {children}
      </main>
    </div>
  );
}

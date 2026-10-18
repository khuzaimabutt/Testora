import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Brand from "../common/Brand";

export default function HomeNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <Brand />
        <nav aria-label="Main" className="hidden items-center gap-8 sm:flex">
          {[
            ["How it works", "#how-it-works"],
            ["Tests", "#feature-test"],
            ["About", "#about-us"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

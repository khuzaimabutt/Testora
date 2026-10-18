import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";

/* Illustrative exam sheet. Not real data: it shows what a test looks like. */
function SpecimenSheet() {
  const options = ["O(1)", "O(log n)", "O(n)", "O(n log n)"];
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden className="absolute -right-3 -top-3 h-full w-full rotate-2 rounded-2xl border bg-secondary" />
      <figure className="surface relative overflow-hidden" aria-label="Example of a question as a student sees it">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <span className="eyebrow">Specimen paper</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 font-mono text-xs text-primary-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden /> 24:13
          </span>
        </div>
        <div className="bg-ruled px-5 pb-6 pt-5">
          <p className="font-mono text-xs text-muted-foreground">Question 07 of 20</p>
          <p className="mt-2 font-display text-lg leading-snug">
            What is the time complexity of binary search on a sorted array?
          </p>
          <ul className="mt-4 space-y-2">
            {options.map((o, i) => (
              <li
                key={o}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${
                  i === 1 ? "border-primary bg-primary/[0.04] font-semibold" : "bg-card"
                }`}
              >
                <span className={`grid h-6 w-6 place-items-center rounded-full border font-mono text-xs ${i === 1 ? "border-primary bg-primary text-primary-foreground" : ""}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {o}
                {i === 1 && <Check className="ml-auto h-4 w-4 text-pass" aria-hidden />}
              </li>
            ))}
          </ul>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[35%] rounded-full bg-primary" />
          </div>
        </div>
      </figure>
      <div className="surface absolute -bottom-6 -left-4 hidden rotate-[-3deg] px-4 py-3 sm:block">
        <p className="eyebrow">Marked by AI</p>
        <p className="font-display text-2xl font-semibold text-mark">
          17<span className="text-base text-muted-foreground">/20</span>
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="relative">
      <div aria-hidden className="bg-grid-paper absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pb-28 lg:pt-24">
        <div>
          <p className="eyebrow rise">Exam preparation and certification</p>
          <h1 className="rise mt-5 text-[2.6rem] font-semibold leading-[1.04] sm:text-6xl" style={{ ["--i" as string]: 1 }}>
            Practise under exam conditions.{" "}
            <span className="italic text-mark">Walk in ready.</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground" style={{ ["--i" as string]: 2 }}>
            Teachers write and publish timed tests, or draft them with AI. Students buy the ones they need, sit them against the clock, and get each answer marked with an explanation.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ ["--i" as string]: 3 }}>
            <Button asChild size="lg">
              <Link href="/sign-up">
                Create a free account <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#feature-test">Browse tests</Link>
            </Button>
          </div>
          <dl className="rise mt-12 grid max-w-lg grid-cols-3 gap-6 border-t pt-6" style={{ ["--i" as string]: 4 }}>
            {[
              ["Timed", "sittings"],
              ["AI", "marking"],
              ["Stripe", "checkout"],
            ].map(([a, b]) => (
              <div key={a}>
                <dt className="font-display text-xl font-semibold">{a}</dt>
                <dd className="text-sm text-muted-foreground">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rise" style={{ ["--i" as string]: 2 }}>
          <SpecimenSheet />
        </div>
      </div>
    </div>
  );
}

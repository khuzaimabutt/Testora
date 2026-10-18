import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, FilePenLine, Sparkles, Timer, Wallet, ListChecks } from "lucide-react";

const teacher = [
  { icon: FilePenLine, title: "Write or upload", body: "Build a test question by question, MCQ, true or false and descriptive, or import a spreadsheet." },
  { icon: Sparkles, title: "Draft with AI", body: "Describe the topic and level, then review and edit the questions the assistant drafts." },
  { icon: Wallet, title: "Publish and price", body: "Set a start date, a duration and a price. Students pay securely through Stripe." },
];
const student = [
  { icon: ListChecks, title: "Pick a test", body: "Browse published tests by instructor, read the brief, and buy the ones you need." },
  { icon: Timer, title: "Sit it timed", body: "Answer against the clock on any screen, with progress shown as you go." },
  { icon: BarChart3, title: "Learn from marking", body: "See your score, the correct answers and an explanation for every question you missed." },
];

function Column({ label, heading, items }: { label: string; heading: string; items: typeof teacher }) {
  return (
    <div className="surface p-6 sm:p-8">
      <p className="eyebrow">{label}</p>
      <h3 className="mt-2 text-2xl font-semibold">{heading}</h3>
      <ol className="mt-8 space-y-7">
        {items.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="grid grid-cols-[auto_1fr] gap-4">
            <span className="relative grid h-11 w-11 place-items-center rounded-xl border bg-background">
              <Icon className="h-5 w-5" aria-hidden />
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-mark font-mono text-[10px] font-semibold text-mark-foreground">
                {i + 1}
              </span>
            </span>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function About() {
  return (
    <div className="mx-auto max-w-6xl">
      <div id="how-it-works" className="grid scroll-mt-24 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            One platform, <span className="italic">two sides of the desk.</span>
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">
          CertiAI gives teachers a place to author and sell practice tests, and gives students a calm, timed place to sit them and learn from the marking.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Column label="For teachers" heading="Set the paper" items={teacher} />
        <Column label="For students" heading="Sit the paper" items={student} />
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-primary px-6 py-6 text-primary-foreground sm:flex-row sm:items-center sm:px-8">
        <p className="font-display text-xl">Choose your role when you sign up, then start building or practising straight away.</p>
        <Button asChild variant="secondary" size="lg" className="shrink-0">
          <Link href="/sign-up">Join CertiAI</Link>
        </Button>
      </div>
    </div>
  );
}

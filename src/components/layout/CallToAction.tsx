import Link from "next/link";
import { Button } from "../ui/button";
import DemoButtons from "@/components/common/DemoButtons";

export default function CallToAction() {
  return (
    <div className="mx-auto max-w-6xl rounded-3xl bg-gray-900 px-8 py-14 text-center text-white sm:px-16">
      <h2 className="font-heading text-3xl font-bold sm:text-4xl">Start practising today</h2>
      <p className="mx-auto mt-4 max-w-xl text-gray-300">
        Create an account for your own tests, or try the demo as a teacher or a student. The demo resets every night.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/sign-up">Get Started</Link>
        </Button>
        <DemoButtons />
      </div>
    </div>
  );
}

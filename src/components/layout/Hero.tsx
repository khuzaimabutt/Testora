import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import HeroMedia from "@/components/motion/HeroMedia";
import DemoButtons from "@/components/common/DemoButtons";
import { CheckCircle2, Timer } from "lucide-react";

export default function Hero() {
  return (
    <div className="grid grid-cols-12  mx-auto gap-8">
      <div className="max-w-2xl pt-28 sm:pt-40 lg:pt-60 col-span-12 lg:col-span-6 px-6 mx-auto">
        <h1 className="enter font-heading text-4xl xl:text-6xl font-bold">
          The Best Way For Your Learning
        </h1>
        <p className="enter text-gray-500 mt-6" style={{ "--d": "80ms" } as React.CSSProperties}>
          Discover your potential with our internationally recognized
          certification tests. Learn at your own pace, enhance your career, and
          join a community eager for growth. Competitive pricing, expert
          support, and unlimited possibilities await!
        </p>

        <div className="enter mt-10 flex flex-wrap items-center gap-3" style={{ "--d": "160ms" } as React.CSSProperties}>
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <DemoButtons />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6">
        <div className="relative">
          <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-screen overflow-hidden rounded-3xl shadow-2xl">
            <HeroMedia
              src="/hero-photo.jpg"
              alt="Laptop, notebook and a cup of coffee on a wooden table in a café"
            />
          </div>
          <div className="enter absolute left-6 bottom-6 hidden w-56 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur sm:block" style={{ "--d": "500ms" } as React.CSSProperties} aria-hidden="true">
            <p className="text-[11px] uppercase tracking-wider text-gray-400">Test score · illustration</p>
            <div className="mt-2 flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <p className="font-heading text-2xl font-bold text-gray-900">8 / 10</p>
            </div>
          </div>
          <div className="enter absolute right-6 top-6 hidden w-44 rounded-2xl bg-gray-900/90 p-4 text-white shadow-xl backdrop-blur sm:block" style={{ "--d": "700ms" } as React.CSSProperties} aria-hidden="true">
            <p className="text-[11px] uppercase tracking-wider text-gray-300">Time left · illustration</p>
            <div className="mt-2 flex items-center gap-2">
              <Timer className="h-5 w-5 text-red-400" />
              <p className="font-heading text-xl font-bold tabular-nums">04:59</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

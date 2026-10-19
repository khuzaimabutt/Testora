import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import HeroMedia from "@/components/motion/HeroMedia";
import DemoButtons from "@/components/common/DemoButtons";

export default function Hero() {
  return (
    <div className="grid grid-cols-12  mx-auto gap-8">
      <div className="max-w-2xl pt-28 sm:pt-40 lg:pt-60 col-span-12 lg:col-span-6 px-6 mx-auto">
        <h1 className="enter text-4xl xl:text-6xl font-bold">
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
        <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-screen">
        <HeroMedia
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero image"
        />
        </div>
      </div>
    </div>
  );
}

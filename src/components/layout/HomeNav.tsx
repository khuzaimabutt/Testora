import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import ScrolledBar from "./ScrolledBar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Tests", href: "#feature-test" },
  { label: "About Us", href: "#about-us" },
];

export default function HomeNav() {
  return (
    <ScrolledBar>
      <div className="flex items-center justify-between px-6 sm:px-10 py-4">
        <div className="h-10 w-[150px]">
          <Image
            src="https://i.postimg.cc/nLFKWJ5z/Rectangle-1.png"
            alt="CertiAI logo"
            width={220}
            height={120}
            className="h-full w-full object-contain object-left"
          />
        </div>
        <div className="hidden sm:flex sm:gap-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="sm:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 mt-8 text-lg font-semibold">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="stagger-item"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </ScrolledBar>
  );
}

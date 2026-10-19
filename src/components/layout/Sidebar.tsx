"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Activity,
  BookOpen,
  CreditCard,
  File,
  GraduationCap,
  Home,
  Menu,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Brand from "../common/Brand";
import { cn } from "@/lib/utils";

const Sidebar = ({ role, userId }: { role: string; userId: string }) => {
  const pathName = usePathname();
  const profileRoute = role === "student" ? "test-takers" : "instructors";

  const roleBasedItems = {
    admin: [
      "/dashboard",
      "/dashboard/instructors",
      "/dashboard/test-takers",
      "/dashboard/payments",
    ],
    instructor: [
      "/dashboard",
      "/dashboard/test",
      `/dashboard/${profileRoute}/${userId}`,
    ],
    student: [
      "/dashboard",
      "/dashboard/test",
      "/dashboard/test-environment",
      `/dashboard/${profileRoute}/${userId}`,
    ],
  } as Record<string, string[]>;
  const sidebarItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard" },
    { title: role === "student" ? "Browse tests" : "Tests", icon: File, href: "/dashboard/test" },
    { title: "My tests", icon: BookOpen, href: "/dashboard/test-environment" },
    { title: "Instructors", icon: UserRound, href: "/dashboard/instructors" },
    { title: "Test takers", icon: GraduationCap, href: "/dashboard/test-takers" },
    { title: "Payments", icon: CreditCard, href: "/dashboard/payments" },
    { title: "Profile", icon: UserRound, href: `/dashboard/${profileRoute}/${userId}` },
    { title: "About", icon: Activity, href: "/about" },
  ];
  const filteredItems = sidebarItems.filter((item) =>
    roleBasedItems[role]?.includes(item.href)
  );
  const isActive = (href: string) =>
    href === "/dashboard" ? pathName === href : pathName === href || pathName?.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 mb-8 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75 sm:mb-10">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[290px] bg-background">
            <Brand href="/dashboard" />
            <nav aria-label="Dashboard" className="mt-10 grid gap-1">
              {filteredItems.map(({ href, title, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium",
                    isActive(href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  {title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Brand href="/dashboard" />

        <nav aria-label="Dashboard" className="ml-6 hidden items-center gap-1 md:flex">
          {filteredItems.map(({ href, title }) => (
            <Link
              href={href}
              key={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(href)
                  ? "text-foreground after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-mark"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {role && (
            <span className="hidden rounded-full border bg-card px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:inline">
              {role}
            </span>
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Sidebar;

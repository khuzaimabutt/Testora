"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormState, useFormStatus } from "react-dom";

import {
  Calendar,
  Clock,
  Delete,
  Edit,
  Loader2,
  Mail,
  Send,
  View,
} from "lucide-react";
import ALertDialogModel from "./ALertDialogModel";
import Link from "next/link";
import { Button } from "../ui/button";
import { publishTest } from "@/actions/test";
import { redirect } from "next/dist/server/api-utils";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  mobile?: string;
  joinedAt: Date;
  profileImage?: string;
  location?: string;
}

function SubmitButton({variant, text}: {variant: string, text:string}) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant={variant === 'secondary' ? 'secondary' : 'default'}  type="submit" className="">
      {!pending ? (
        <>
          <Send className="h-4 w-4" /> {text}
        </>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
    </Button>
  );
}

export default function TestCard({
  title,
  instructor,
  description,
  duration,
  startAt,
  id,
  userId,
  isEdit = false,
  role,
  published,
  isPurchased = false,
  canStartTest = false,
  price = 30,
}: {
  id: number;
  title: string;
  description: string | null;
  instructor: string | null;
  duration: number;
  startAt: Date;
  userId: string;
  isEdit?: boolean;
  role?: string;
  published: boolean;
  isPurchased?: boolean;
  canStartTest?: boolean;
  price?: number;
}) {
  const [state, formAction] = useFormState(publishTest, null);

  function StartTest(testStartDate: Date | string) {
    const currentDate = new Date();
    const startDate = new Date(testStartDate);

    const normalizedCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const normalizedStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    return normalizedCurrentDate >= normalizedStartDate;
  }

  const start = canStartTest ? StartTest(startAt) : false;

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_1px_0_hsl(var(--border)),0_18px_40px_-20px_hsl(226_42%_11%/0.35)]">
      <div aria-hidden className="h-1 w-full bg-primary/90 group-hover:bg-mark" />
      <CardHeader className="gap-3 pb-4">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow truncate">{instructor || "Instructor"}</span>
          {role === "instructor" && (
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
                published ? "bg-pass-soft text-pass" : "bg-muted text-muted-foreground"
              }`}
            >
              {published ? "Live" : "Draft"}
            </span>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {description || "No description added yet."}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-5">
        <dl className="grid grid-cols-3 divide-x rounded-xl border bg-background/60 text-center">
          <div className="px-2 py-2.5">
            <dt className="sr-only">Starts</dt>
            <dd className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={14} aria-hidden />
              {new Date(startAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
            </dd>
          </div>
          <div className="px-2 py-2.5">
            <dt className="sr-only">Duration</dt>
            <dd className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={14} aria-hidden />
              {duration} min
            </dd>
          </div>
          <div className="px-2 py-2.5">
            <dt className="sr-only">Price</dt>
            <dd className="font-mono text-sm font-semibold">${price}</dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t bg-muted/40 py-4">
        {role === "instructor" && (
          <>
            <div className="flex items-center gap-1">
              <Button asChild variant="ghost" size="icon" aria-label={`Edit ${title}`}>
                <Link href={`/dashboard/test/create-test?type=edit&id=${id}`}>
                  <Edit size={18} />
                </Link>
              </Button>
              <ALertDialogModel icon={<Delete size={18} />} text="test" id={id} />
            </div>
            <form action={formAction}>
              <input type="hidden" name="id" value={id} />
              <input
                type="hidden"
                name="publish"
                value={published ? "false" : "true"}
              />
              <SubmitButton
                variant={published ? "secondary" : "default"}
                text={published ? "Unpublish" : "Publish"}
              />
            </form>
          </>
        )}

        {role === "student" &&
          (canStartTest ? (
            <Button
              asChild
              disabled={start}
              variant={!start ? "secondary" : "default"}
              className="w-full"
            >
              {start ? (
                <Link href={`/dashboard/test-environment/${id}`}>
                  Start test
                </Link>
              ) : (
                <span>Opens {new Date(startAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>
              )}
            </Button>
          ) : (
            <Button
              asChild
              disabled={isPurchased}
              variant={isPurchased ? "secondary" : "default"}
              className="w-full"
            >
              {isPurchased ? (
                <span>Purchased</span>
              ) : (
                <Link href={`/checkout/${id}`}>
                  {isPurchased ? "Purchased" : `Buy for $${price}`}
                </Link>
              )}
            </Button>
          ))}
      </CardFooter>
    </Card>
  );
}

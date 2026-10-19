"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Test } from "@/types/types";
import Link from "next/link";
import { useMemo, useState } from "react";
import TestCard from "../TestCard";

export default function FilterTest({
  role,
  username,
  tests,
}: {
  role: string;
  username: string;
  tests: Test[];
}) {
  const [filter, setFilter] = useState("all");

  const filteredTests = useMemo(() => {
    return tests.filter((test) =>
      filter === "all"
        ? test
        : filter === "publish"
        ? test.published
        : !test.published
    );
  }, [tests, filter]);

  return (
    <div className="mb-10">
      <div className="flex justify-end my-4">
        {role === "instructor" && (
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{`All (${tests.length})`}</SelectItem>
              <SelectItem value="publish">{`Live (${
                tests.filter((t) => t.published).length
              })`}</SelectItem>
              <SelectItem value="unpublish">{`Draft (${
                tests.filter((t) => !t.published).length
              })`}</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {filteredTests.filter((t) => role !== "student" || t.published).length === 0 && (
        <div className="text-gray-600 py-10 text-center space-y-3">
          <p>
            {role === "student"
              ? "No published tests yet. Check back later."
              : filter === "publish"
              ? "No live tests yet. Publish a test to make it visible to students."
              : filter === "unpublish"
              ? "No draft tests. Every test is live."
              : "No tests yet. Create one to get started."}
          </p>
          {role === "instructor" && filter === "all" && (
            <Link href="/dashboard/test/create-test" className="underline">
              Create your first test
            </Link>
          )}
        </div>
      )}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        {filteredTests?.map((test) => {
          if (role === "student" && !test.published) return;
          return (
            <TestCard
              key={test.id}
              id={test.id}
              userId={test.userId}
              title={test.title}
              instructor={
                role !== "student" ? username : (test?.user?.name as string)
              }
              description={test.description as string}
              duration={test.duration}
              startAt={test.startAt}
              role={role as string}
              published={test.published}
              isPurchased={test.purchased}
              price={test.price}
            />
          );
        })}
      </div>
    </div>
  );
}

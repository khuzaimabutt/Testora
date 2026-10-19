"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Test } from "@/types/types";
import { useMemo, useState } from "react";
import TestCard from "../TestCard";
import EmptyState from "../EmptyState";

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

  const visibleCount = filteredTests.filter((t) => role !== "student" || t.published).length;

  return (
    <div className="mb-10">
      <div className="my-4 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
          {visibleCount} {visibleCount === 1 ? "test" : "tests"}
        </p>
        {role === "instructor" && (
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]" aria-label="Filter tests by status">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All tests</SelectItem>
              <SelectItem value="publish">Published</SelectItem>
              <SelectItem value="unpublish">Drafts</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {visibleCount === 0 && (
        <EmptyState
          title={role === "instructor" ? (tests.length === 0 ? "Your first test starts here" : "No tests match this filter") : "No tests published yet"}
          body={
            role === "instructor"
              ? tests.length === 0
                ? "Create a test by hand or let AI draft one for you. Drafts stay private until you publish them."
                : "Switch the filter to see your other tests."
              : "When instructors publish practice tests they will appear here, ready to buy and sit."
          }
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
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

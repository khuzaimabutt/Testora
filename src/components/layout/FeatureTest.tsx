import { getAllPublishedTests } from "@/actions/test";
import TestCard from "../common/TestCard";
import EmptyState from "../common/EmptyState";
import { Button } from "../ui/button";
import Link from "next/link";

const FeatureTest = async () => {
  const tests = await getAllPublishedTests();
  const visible = (tests || []).filter((t) => t.published).slice(0, 6);
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Published tests</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Open for practice</h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Practice tests published by instructors on CertiAI. Each one is timed and marked the moment you submit.
        </p>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          className="mt-12"
          title="The first papers are being written"
          body="No tests have been published yet. Instructors can sign up and publish the first one; students will see it here as soon as it goes live."
        >
          <Button asChild>
            <Link href="/sign-up">Become an instructor</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">Join as a student</Link>
          </Button>
        </EmptyState>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((test) => (
            <TestCard
              key={test.id}
              id={test.id}
              userId={test.userId}
              title={test.title}
              instructor={test?.user?.name as string}
              description={test.description as string}
              duration={test.duration}
              startAt={test.startAt}
              role={"student" as string}
              published={test.published}
              isPurchased={false}
              price={test.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureTest;

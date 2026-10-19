import { Button } from "@/components/ui/button";
import Link from "next/link";
import EmptyState from "@/components/common/EmptyState";

export default function NotFound() {
  return (
    <div>
      <p className="eyebrow">Exam room</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Test not found</h1>
      <EmptyState
        className="mt-10"
        title="This test is not available to you"
        body="It may have been unpublished, or you have not bought it yet. Your purchased tests are listed under My tests."
      >
        <Button asChild>
          <Link href="/dashboard/test-environment">Go to My tests</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/test">Browse tests</Link>
        </Button>
      </EmptyState>
    </div>
  );
}

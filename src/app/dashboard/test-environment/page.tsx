import { getPurchasedTestsByUserId } from "@/actions/payment";
import { getRole } from "@/actions/user";
import TestCard from "@/components/common/TestCard";

import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import NotFound from "./not-found";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Test {
  id: number;
  title: string;
  description?: string;
  duration: number;
  price:number;
  userId: string;
  startAt: Date;
  published: boolean;
  purchased?: boolean;
  creatorName: string;
}

async function getPurchasedTestsbyUser(id: string) {
  const data = await getPurchasedTestsByUserId(id);
  console.log(data);
  return data as Test[];
}
export default async function TestEnvironmentPage() {
  const { userId } = auth();
  const role = await getRole();
  const testList = await getPurchasedTestsbyUser(userId as string);
  console.log(testList);

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

    return normalizedCurrentDate.getTime() === normalizedStartDate.getTime();
  }

  

  return (
    <div>
      <p className="eyebrow">Exam room</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">My tests</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Tests you have bought. A test can be started from its start date; the timer begins when you open it.
      </p>

      {(!testList || testList.length === 0) && (
        <EmptyState
          className="mt-10"
          title="No tests purchased yet"
          body="Browse the published tests, buy the one you want to practise, and it will be waiting for you here."
        >
          <Button asChild>
            <Link href="/dashboard/test">Browse tests</Link>
          </Button>
        </EmptyState>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testList?.map((test) => (
          <TestCard
            key={test.id}
            id={test.id}
            title={test.title}
            userId={test.userId}
            instructor={test.creatorName}
            description={test.description as string}
            duration={test.duration}
            startAt={test.startAt}
            published={test.published}
            price={test.price}
            isPurchased={true}
            role={role as string}
            canStartTest={true}
          />
        ))}
      </div>
    </div>
  );
}

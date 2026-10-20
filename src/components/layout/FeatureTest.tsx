import { getAllPublishedTests,} from "@/actions/test";
import TestCard from "../common/TestCard";
import Reveal from "../motion/Reveal";

const FeatureTest = async () => {
  const tests = await getAllPublishedTests();
  return (
    <section id="tests" className="max-container max-sm:mt-12">
      <div className="flex flex-col gap-5">
        <p className="text-4xl font-bold font-heading">
          Our <span className="text-primary">Popular</span> Tests
        </p>
        <p className="lg:max-w-lg text-gray-500">
            Enhance your exam readiness with our curated selection of practice tests. 
          Explore our wide range of subjects and find the perfect tests to challenge your 
          knowledge and sharpen your skills.
        </p>

        <div
          className="flex gap-5 mt-16 overflow-x-auto snap-x snap-mandatory pb-4 -mx-8 px-8 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-14 md:overflow-visible"
        >
          {tests?.filter((t) => t.published).length === 0 && (
            <p className="text-gray-500 col-span-full">
              No published tests yet. Check back soon.
            </p>
          )}
          {tests?.map((test, index) => {
            if ("student" === "student" && !test.published) return;
            if (index > 5) return;
            return (
              <Reveal key={test.id} delay={(index % 3) * 90} className="w-[82%] shrink-0 snap-start md:w-auto">
              <TestCard
                id={test.id}
                userId={test.userId}
                title={test.title}
                instructor={test?.user?.name as string}
                description={test.description as string}
                duration={test.duration}
                startAt={test.startAt}
                role={'student' as string}
                published={test.published}
                isPurchased={false}
                price={test.price}
              />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureTest;

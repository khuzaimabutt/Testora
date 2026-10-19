import { Button } from "@/components/ui/button";

// Plain anchors on purpose: next/link would prefetch the API route and mint
// sign-in tokens nobody uses.
export default function DemoButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Button asChild variant="outline">
        <a href="/api/demo/teacher">Try as Teacher</a>
      </Button>
      <Button asChild variant="outline">
        <a href="/api/demo/student">Try as Student</a>
      </Button>
    </div>
  );
}

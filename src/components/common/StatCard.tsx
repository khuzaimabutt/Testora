import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CountUp from "@/components/motion/CountUp";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <div className="flex flex-col space-y-2">
          <CardTitle className="text-4xl">
            <CountUp value={value} />
          </CardTitle>
          <CardDescription>{title}</CardDescription>
        </div>
        <div className="h-16 w-16 p-2 bg-secondary rounded-md">{icon}</div>
      </CardHeader>
    </Card>
  );
}

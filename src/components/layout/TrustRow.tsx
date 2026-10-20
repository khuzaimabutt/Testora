import { Clock, Sparkles, LayoutDashboard, CreditCard } from "lucide-react";

// Real features of the app, stated plainly. No counts, logos or testimonials.
const ITEMS = [
  { icon: Clock, label: "Timed exams", detail: "Countdown, progress and a clear last-five-minutes warning" },
  { icon: Sparkles, label: "AI-assisted tests", detail: "Generate questions and get AI feedback on results" },
  { icon: LayoutDashboard, label: "Teacher and student dashboards", detail: "Create, publish, take and review in one place" },
  { icon: CreditCard, label: "Test-mode payments", detail: "Stripe test mode, so checkout can be tried safely" },
];

export default function TrustRow() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto px-6">
      {ITEMS.map(({ icon: Icon, label, detail }) => (
        <li
          key={label}
          className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-heading font-semibold text-gray-900">{label}</p>
            <p className="mt-1 text-sm text-gray-500">{detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

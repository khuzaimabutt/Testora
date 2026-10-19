import { SignIn } from "@clerk/nextjs";
import DemoButtons from "@/components/common/DemoButtons";

// Optional fallback if the one-click ticket flow is not available: show the
// demo login. Off unless DEMO_SHOW_CREDENTIALS=true. Values come from env only.
function DemoCredentials() {
  if (process.env.DEMO_SHOW_CREDENTIALS !== "true") return null;
  const password = process.env.DEMO_PASSWORD;
  const teacher = process.env.DEMO_TEACHER_EMAIL;
  const student = process.env.DEMO_STUDENT_EMAIL;
  if (!password || !teacher || !student) return null;
  return (
    <div className="mt-4 w-full max-w-sm rounded-md border bg-white p-4 text-sm text-gray-600">
      <p className="font-semibold text-gray-900">Demo logins</p>
      <p className="mt-2">
        Teacher: <span className="select-all font-mono">{teacher}</span>
      </p>
      <p>
        Student: <span className="select-all font-mono">{student}</span>
      </p>
      <p>
        Password: <span className="select-all font-mono">{password}</span>
      </p>
    </div>
  );
}

export default function SignInPage({
  searchParams,
}: {
  searchParams: { demo?: string };
}) {
  return (
    <div className="flex flex-col items-center">
      <SignIn />
      <div className="mt-4 flex flex-col items-center text-center">
        <p className="text-sm text-gray-500">Just looking around?</p>
        <DemoButtons className="mt-2 justify-center" />
        {searchParams?.demo && (
          <p className="mt-2 text-sm text-red-600">
            The demo account is not available right now. Please sign up instead.
          </p>
        )}
        <DemoCredentials />
      </div>
    </div>
  );
}

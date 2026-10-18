import Link from "next/link";
import Brand from "../common/Brand";

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A mock test portal that connects the teachers who write practice tests with the students preparing for exams.
          </p>
        </div>
        <nav aria-label="Product">
          <p className="eyebrow">Product</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-mark" href="/#how-it-works">How it works</Link></li>
            <li><Link className="hover:text-mark" href="/#feature-test">Published tests</Link></li>
            <li><Link className="hover:text-mark" href="/about">About</Link></li>
          </ul>
        </nav>
        <nav aria-label="Account">
          <p className="eyebrow">Account</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-mark" href="/sign-up">Create an account</Link></li>
            <li><Link className="hover:text-mark" href="/sign-in">Log in</Link></li>
            <li><Link className="hover:text-mark" href="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground sm:px-8">
          &copy; {new Date().getFullYear()} CertiAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

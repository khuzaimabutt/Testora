import { socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";

// Only links that go somewhere real on this site.
const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Popular tests", href: "/#feature-test" },
      { label: "About us", href: "/#about-us" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/sign-in" },
      { label: "Sign up", href: "/sign-up" },
    ],
  },
];

const Footer = () => {
  const liveSocials = socials.filter((s) => s.link);
  return (
    <footer className="px-8 py-10 mt-20 bg-gradient-to-r from-violet-100 to-[#f6d1c5]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-2 md:col-span-2">
          <Image
            src="https://i.postimg.cc/nLFKWJ5z/Rectangle-1.png"
            alt="CertiAI logo"
            className="h-16 w-auto"
            width={100}
            height={100}
          />
          <p className="text-gray-600 pt-4">
            CertiAI is an online mock test portal. Connecting teachers and students in Pakistan and beyond.
          </p>
        </div>
        <div className="flex flex-wrap justify-between md:col-span-4 gap-8">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h5 className="font-semibold uppercase mb-2.5">{col.title}</h5>
              <ul className="text-gray-600">
                {col.links.map((l) => (
                  <li key={l.label} className="mb-2">
                    <Link href={l.href} className="hover:text-gray-900">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 border-t pt-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} CertiAI. All rights reserved.
          </p>
          {liveSocials.length > 0 && (
            <div className="flex items-center space-x-4">
              {liveSocials.map((social) => (
                <Link href={social.link} className="hover:text-primary" key={social.name}>
                  {social.icon}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

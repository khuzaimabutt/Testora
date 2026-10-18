import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Certi AI App",
  description:
    "Practice tests and certification prep. Teachers build and publish tests, students sit them against the clock and see where to improve.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} ${mono.variable} font-sans`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#14213d",
              colorText: "#10142a",
              colorBackground: "#fdfbf6",
              colorInputBackground: "#ffffff",
              borderRadius: "0.625rem",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
            },
          }}
        >
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}

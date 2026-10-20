"use client";
import { useEffect, useState } from "react";

// Illustration of the AI test builder. The text is a sample, not output from the app.
const TOPIC = "Photosynthesis, Grade 9";
const QUESTION = "Which gas do plants take in for photosynthesis?";
const OPTIONS = ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"];
const ANSWER = 1;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function BuilderShowcase() {
  const [topic, setTopic] = useState(TOPIC);
  const [question, setQuestion] = useState(QUESTION);
  const [shown, setShown] = useState(OPTIONS.length);
  const [picked, setPicked] = useState<number | null>(ANSWER);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setTopic("");
        setQuestion("");
        setShown(0);
        setPicked(null);
        for (let i = 1; i <= TOPIC.length; i++) {
          if (cancelled) return;
          setTopic(TOPIC.slice(0, i));
          await wait(45);
        }
        await wait(300);
        for (let i = 1; i <= QUESTION.length; i++) {
          if (cancelled) return;
          setQuestion(QUESTION.slice(0, i));
          await wait(22);
        }
        for (let k = 1; k <= OPTIONS.length; k++) {
          await wait(350);
          if (cancelled) return;
          setShown(k);
        }
        await wait(500);
        if (cancelled) return;
        setPicked(ANSWER);
        await wait(3500);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <figure className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10" aria-label="Illustration of the AI test builder">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl">AI test builder</p>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">Illustration</span>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-gray-700">Describe the topic</p>
          <div className="mt-2 min-h-[3rem] rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900">
            {topic}
            <span className="ml-0.5 inline-block h-5 w-px animate-pulse bg-gray-900 align-middle" aria-hidden="true" />
          </div>
          <p className="mt-4 text-gray-500">
            The builder drafts questions and answers from the topic. You review each one before it goes live.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Draft question</p>
          <div className="mt-2 rounded-xl border border-gray-200 p-4">
            <p className="min-h-[3rem] font-medium text-gray-900">{question}</p>
            <ul className="mt-4 grid gap-2">
              {OPTIONS.map((option, i) => (
                <li
                  key={option}
                  className={`rounded-lg border px-4 py-2.5 text-sm transition-colors duration-300 ${
                    i < shown ? "opacity-100" : "opacity-0"
                  } ${
                    picked === i
                      ? "border-green-600 bg-green-50 text-green-800"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </figure>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { submitAiTest, submitTestResult } from "@/actions/test";

type Question = {
  id: number;
  question: string;
  options?: string[];
  type: string;
  answer?: string;
  testId: number;
};

type AttemptedQuestion = {
  id: number;
  question: string;
  options?: string[];
  type: string;
  attemptedUserAnswer: string;
};

interface TestPageProps {
  questions: Question[];
  testTime: number;
  duration: number;
  title: string;
  description: string;
  testId: number;
}

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full sm:w-auto sm:px-6">
      {!pending ? (
        <>
          <Send className="h-4 w-4" /> Submit test
        </>
      ) : (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Marking your answers
        </>
      )}
    </Button>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

const optionClass =
  "flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border bg-card px-4 py-3 text-[15px] transition-colors hover:border-primary/40 hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/[0.05] has-[:checked]:font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2";
const radioClass =
  "h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-input bg-card checked:border-[6px] checked:border-primary focus-visible:outline-none";

const TestPage: React.FC<TestPageProps> = ({
  questions,
  testTime,
  duration,
  description,
  title,
  testId,
}) => {
  const [time, setTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState<AttemptedQuestion[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime: any) => {
        if (prevTime >= testTime) {
          handleSubmit();
          clearInterval(timer);
          return prevTime;
        } else {
          return prevTime + 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [testTime]);

  useEffect(() => {
    const totalQuestions = questions.length;
    const answeredQuestions = attemptedQuestions.length;
    const calculatedProgress = totalQuestions ? (answeredQuestions / totalQuestions) * 100 : 0;
    setProgress(calculatedProgress);
  }, [attemptedQuestions, questions]);

  useEffect(() => {
    const mcqs = questions.filter((q) => q.type === "MCQS" || q.type === "True/False");
    const descriptive = questions.filter((q) => q.type === "Descriptive");
    const shuffledMcqs = [...mcqs].sort(() => Math.random() - 0.5);
    const shuffledDescriptive = [...descriptive].sort(() => Math.random() - 0.5);
    setShuffledQuestions([...shuffledMcqs, ...shuffledDescriptive]);
  }, [questions]);

  const handleAnswerChange = (
    id: number,
    question: string,
    type: string,
    answer: string,
    options?: string[]
  ) => {
    const newQuestion: AttemptedQuestion = {
      id,
      question,
      options: options ? options : undefined,
      type: type,
      attemptedUserAnswer: answer,
    };

    const existingIndex = attemptedQuestions.findIndex((q) => q.id === id);

    if (existingIndex !== -1) {
      const updatedQuestions = [...attemptedQuestions];
      updatedQuestions[existingIndex] = newQuestion;
      setAttemptedQuestions(updatedQuestions);
    } else {
      setAttemptedQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const handleSubmit = () => {
    let prompt =
      "Please evaluate the user's attempted test questions and provide the correct answer if the user's answer is incorrect.\n\n";

    questions.forEach((question, index) => {
      const attemptedQuestion = attemptedQuestions.find((q) => q.id === question.id);
      if (attemptedQuestion) {
        prompt += `Q${index + 1}: ${question.question}\n Options: ${question.options}\n`;
        if (
          attemptedQuestion.type === "MCQS" ||
          attemptedQuestion.type === "True/False" ||
          attemptedQuestion.type === "Descriptive"
        ) {
          prompt += `User's Answer: ${attemptedQuestion.attemptedUserAnswer}\n\n`;
        }
      } else {
        prompt += `Q${index + 1}: ${question.question}\n Options: ${question.options}\n type: ${question.type}\n User's Answer: ${""}\n\n`;
      }
    });

    return prompt;
  };

  const remaining = Math.max(testTime - time, 0);
  const clock =
    remaining >= 3600
      ? `${Math.floor(remaining / 3600)}:${pad(Math.floor((remaining % 3600) / 60))}:${pad(remaining % 60)}`
      : `${pad(Math.floor(remaining / 60))}:${pad(remaining % 60)}`;
  const lowTime = testTime > 0 && remaining <= 300;
  const answeredIds = new Set(
    attemptedQuestions.filter((q) => q.attemptedUserAnswer !== "").map((q) => q.id)
  );

  return (
    <form
      action={async () => {
        const prompt = handleSubmit();
        const result = await submitAiTest(prompt, testId);
        await submitTestResult(result, testId);
      }}
      className="mx-auto max-w-3xl pb-32 sm:pb-24"
    >
      <div className="sticky top-16 z-30 -mx-4 border-b bg-background/95 px-4 py-3 backdrop-blur sm:-mx-10 sm:px-10">
        <div className="mx-auto flex max-w-3xl items-center gap-3 sm:gap-5">
          <div
            role="timer"
            aria-label={`Time remaining ${clock}`}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 font-mono text-lg font-semibold tabular-nums ${
              lowTime ? "bg-mark text-mark-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            <Clock className="h-4 w-4" aria-hidden />
            {clock}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-medium">
                {answeredIds.size} of {questions.length} answered
              </span>
              <span className="hidden text-muted-foreground sm:inline">{duration} min paper</span>
            </div>
            <Progress value={progress} className="mt-1.5 h-2" aria-label="Answered questions" />
          </div>
        </div>
      </div>

      <header className="mt-8">
        <p className="eyebrow">Test in progress</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>}
      </header>

      {shuffledQuestions.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed bg-card p-8 text-muted-foreground">
          This test has no questions yet. Check back once the instructor has added them.
        </div>
      )}

      <ol className="mt-8 space-y-5">
        {shuffledQuestions?.map((questionData, index) => {
          const answered = answeredIds.has(questionData.id);
          const qid = `q-${index}`;
          return (
            <li key={index} className="surface p-5 sm:p-7">
              <fieldset>
                <legend className="w-full">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      Question {pad(index + 1)} of {pad(shuffledQuestions.length)}
                      <span className="ml-2 rounded bg-muted px-1.5 py-0.5 uppercase">
                        {questionData.type === "MCQS" ? "MCQ" : questionData.type}
                      </span>
                    </span>
                    {answered && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-pass">
                        <CheckCircle2 className="h-4 w-4" aria-hidden /> Answered
                      </span>
                    )}
                  </span>
                  <span id={qid} className="mt-3 block font-display text-xl leading-snug">
                    {questionData.question}
                  </span>
                </legend>

                {questionData.type === "MCQS" && (
                  <ul className="mt-5 grid gap-2.5">
                    {questionData.options?.map((option, optionIndex) => (
                      <li key={optionIndex}>
                        <label className={optionClass}>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optionIndex}
                            className={radioClass}
                            onChange={() =>
                              handleAnswerChange(
                                questionData.id,
                                questionData.question,
                                questionData.type,
                                option,
                                questionData.options
                              )
                            }
                          />
                          <span className="font-mono text-xs text-muted-foreground">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span>{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
                {questionData.type === "True/False" && (
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {["True", "False"].map((v) => (
                      <label key={v} className={optionClass}>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={v}
                          className={radioClass}
                          onChange={() =>
                            handleAnswerChange(
                              questionData.id,
                              questionData.question,
                              questionData.type,
                              v,
                              ["True", "False"]
                            )
                          }
                        />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                )}
                {questionData.type === "Descriptive" && (
                  <textarea
                    aria-labelledby={qid}
                    rows={5}
                    className="mt-5 w-full rounded-xl border border-input bg-card p-4 text-[15px] leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Write your answer here"
                    onChange={(e) =>
                      handleAnswerChange(
                        questionData.id,
                        questionData.question,
                        questionData.type,
                        e.target.value
                      )
                    }
                  ></textarea>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 px-4 py-3 backdrop-blur sm:sticky sm:bottom-6 sm:mt-10 sm:rounded-2xl sm:border sm:bg-card sm:px-5 sm:shadow-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="hidden text-sm text-muted-foreground md:block">
            Unanswered questions are marked blank. The test submits itself when time runs out.
          </p>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
};

export default TestPage;

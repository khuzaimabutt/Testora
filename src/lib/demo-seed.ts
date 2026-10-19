import type { PrismaClient } from "@prisma/client";
import { DEMO_TEST_ID_START, DEMO_TEST_ID_END } from "./demo";

// Sample content for the two demo accounts. Safe to run repeatedly: it removes
// everything the demo users own (and the seeded test range) and recreates it.
// Used by prisma/seed-demo.ts and by the nightly reset route.

type Q = {
  question: string;
  options: string[];
  type: "MCQS" | "True/False" | "Descriptive";
  answer: number | null;
  model?: string; // model answer text for Descriptive questions
};

const mc = (question: string, options: string[], answer: number): Q => ({
  question,
  options,
  type: "MCQS",
  answer,
});
const tf = (question: string, isTrue: boolean): Q => ({
  question,
  options: ["True", "False"],
  type: "True/False",
  answer: isTrue ? 0 : 1,
});
const ds = (question: string, model: string): Q => ({
  question,
  options: [],
  type: "Descriptive",
  answer: null,
  model,
});

type SeedTest = {
  id: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  published: boolean;
  questions: Q[];
};

export const SEED_TESTS: SeedTest[] = [
  {
    id: DEMO_TEST_ID_START,
    title: "Algebra Essentials (Sample)",
    description: "Sample test: equations, expressions and basic functions.",
    duration: 20,
    price: 5,
    published: true,
    questions: [
      mc("Solve for x: 2x + 6 = 14", ["x = 3", "x = 4", "x = 5", "x = 8"], 1),
      mc("What is the value of 3^3?", ["9", "18", "27", "81"], 2),
      mc("Which expression equals (x + 2)(x + 3)?", ["x^2 + 5x + 6", "x^2 + 6x + 5", "x^2 + 5", "2x + 5"], 0),
      mc("The slope of y = 4x - 7 is:", ["-7", "4", "7", "-4"], 1),
      mc("If f(x) = x + 5, what is f(3)?", ["5", "8", "15", "2"], 1),
      mc("Simplify: 5a + 2a", ["7a", "10a", "7a^2", "3a"], 0),
      tf("A quadratic equation can have two real solutions.", true),
      tf("The expression 2(x + 3) equals 2x + 3.", false),
      ds("Explain in one or two sentences what a variable is.", "A variable is a symbol, usually a letter, that stands for a number that can change or is not yet known."),
      ds("Describe how you would solve 3x - 5 = 10.", "Add 5 to both sides to get 3x = 15, then divide both sides by 3 to get x = 5."),
    ],
  },
  {
    id: DEMO_TEST_ID_START + 1,
    title: "World History Basics (Sample)",
    description: "Sample test: key events and periods in world history.",
    duration: 15,
    price: 8,
    published: true,
    questions: [
      mc("Which civilization built the pyramids of Giza?", ["Roman", "Ancient Egyptian", "Greek", "Maya"], 1),
      mc("In which year did World War II end?", ["1918", "1939", "1945", "1950"], 2),
      mc("The Renaissance began in which country?", ["France", "England", "Italy", "Spain"], 2),
      mc("Who was the first emperor of Rome?", ["Julius Caesar", "Augustus", "Nero", "Trajan"], 1),
      tf("The printing press was invented in the 15th century.", true),
      tf("The French Revolution began in 1689.", false),
      ds("Name one cause of the First World War.", "Possible answers include the alliance system, militarism, imperial rivalry, nationalism or the assassination of Archduke Franz Ferdinand."),
      ds("Why was the Silk Road important?", "It connected East and West, allowing trade in goods and the spread of ideas, religions and technology."),
    ],
  },
  {
    id: DEMO_TEST_ID_START + 2,
    title: "Biology Fundamentals (Sample)",
    description: "Sample test: cells, genetics and the human body.",
    duration: 25,
    price: 10,
    published: true,
    questions: [
      mc("What is the powerhouse of the cell?", ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], 1),
      mc("Which molecule carries genetic information?", ["DNA", "ATP", "Glucose", "Lipid"], 0),
      mc("Photosynthesis takes place mainly in the:", ["Roots", "Chloroplasts", "Mitochondria", "Vacuoles"], 1),
      mc("How many chromosomes does a typical human cell have?", ["23", "44", "46", "48"], 2),
      mc("Which blood cells fight infection?", ["Red blood cells", "Platelets", "White blood cells", "Plasma"], 2),
      mc("The basic unit of life is the:", ["Atom", "Cell", "Organ", "Tissue"], 1),
      tf("Plants release oxygen during photosynthesis.", true),
      tf("Bacteria are always harmful to humans.", false),
      tf("Enzymes speed up chemical reactions in living things.", true),
      ds("Describe the difference between a plant cell and an animal cell.", "Plant cells have a cell wall, chloroplasts and a large vacuole; animal cells do not."),
    ],
  },
  {
    id: DEMO_TEST_ID_START + 3,
    title: "JavaScript Basics (Sample)",
    description: "Sample test: variables, functions and core language concepts.",
    duration: 30,
    price: 15,
    published: true,
    questions: [
      mc("Which keyword declares a constant in JavaScript?", ["var", "let", "const", "static"], 2),
      mc("What does typeof null return?", ["null", "object", "undefined", "number"], 1),
      mc("Which method adds an item to the end of an array?", ["push()", "pop()", "shift()", "unshift()"], 0),
      mc("What is the result of the expression '5' + 3?", ["8", "53", "NaN", "Error"], 1),
      mc("Which symbol starts a single-line comment?", ["#", "//", "<!--", "**"], 1),
      mc("Which function converts JSON text to an object?", ["JSON.parse()", "JSON.stringify()", "Object.from()", "parseObject()"], 0),
      mc("Arrow functions were introduced in:", ["ES3", "ES5", "ES6", "ES2025 only"], 2),
      tf("JavaScript and Java are the same language.", false),
      tf("An array in JavaScript can hold values of different types.", true),
      tf("The === operator compares both value and type.", true),
      ds("What is a closure? Answer in one or two sentences.", "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished."),
      ds("Explain the difference between let and var.", "let is block scoped and cannot be redeclared in the same scope; var is function scoped and is hoisted."),
    ],
  },
  {
    id: DEMO_TEST_ID_START + 4,
    title: "Chemistry Basics (Sample draft)",
    description: "Sample draft test, not yet published: elements and reactions.",
    duration: 20,
    price: 12,
    published: false,
    questions: [
      mc("What is the chemical symbol for water?", ["H2O", "CO2", "O2", "NaCl"], 0),
      mc("Which gas do humans need to breathe?", ["Nitrogen", "Oxygen", "Helium", "Hydrogen"], 1),
      mc("The atomic number of carbon is:", ["4", "6", "8", "12"], 1),
      mc("Table salt is made of sodium and:", ["Chlorine", "Calcium", "Carbon", "Copper"], 0),
      tf("Acids have a pH below 7.", true),
      tf("Gold is a compound.", false),
      ds("What is the difference between an element and a compound?", "An element has only one kind of atom; a compound has two or more elements chemically bonded."),
      ds("Name two properties of metals.", "Metals conduct heat and electricity, and are usually shiny and malleable."),
    ],
  },
];

export const SAMPLE_FEEDBACK = {
  right: "Correct. Well done.",
  wrong:
    "Sample AI feedback: review this topic and try again. The correct answer is shown above.",
};

function answerText(q: Q): string {
  if (q.answer === null) return q.model || "";
  return q.options[q.answer];
}

// Removes everything the demo users own plus the whole seeded test range.
export async function resetDemoData(
  db: PrismaClient,
  teacherId: string,
  studentId: string
) {
  const demoIds = [teacherId, studentId];
  const tests = await db.test.findMany({
    where: {
      OR: [
        { userId: { in: demoIds } },
        { id: { gte: DEMO_TEST_ID_START, lte: DEMO_TEST_ID_END } },
      ],
    },
    select: { id: true },
  });
  const testIds = tests.map((t) => t.id);

  const results = await db.testResult.findMany({
    where: { OR: [{ userId: { in: demoIds } }, { testId: { in: testIds } }] },
    select: { id: true },
  });
  const resultIds = results.map((r) => r.id);

  await db.questionResult.deleteMany({
    where: { testResultId: { in: resultIds } },
  });
  await db.testResult.deleteMany({ where: { id: { in: resultIds } } });
  await db.payment.deleteMany({
    where: { OR: [{ userId: { in: demoIds } }, { testId: { in: testIds } }] },
  });
  await db.question.deleteMany({ where: { testId: { in: testIds } } });
  await db.test.deleteMany({ where: { id: { in: testIds } } });
}

export async function seedDemo(
  db: PrismaClient,
  teacherId: string,
  studentId: string
) {
  if (!teacherId || !studentId) {
    throw new Error(
      "DEMO_TEACHER_CLERK_ID and DEMO_STUDENT_CLERK_ID are required"
    );
  }

  await db.user.upsert({
    where: { id: teacherId },
    update: { name: "Demo Teacher", role: "instructor", location: "Demo City" },
    create: {
      id: teacherId,
      email: process.env.DEMO_TEACHER_EMAIL || "demo-teacher@example.com",
      name: "Demo Teacher",
      role: "instructor",
      location: "Demo City",
      mobile: "0000000000",
    },
  });
  await db.user.upsert({
    where: { id: studentId },
    update: { name: "Demo Student", role: "student", location: "Demo City" },
    create: {
      id: studentId,
      email: process.env.DEMO_STUDENT_EMAIL || "demo-student@example.com",
      name: "Demo Student",
      role: "student",
      location: "Demo City",
      mobile: "0000000000",
    },
  });

  await resetDemoData(db, teacherId, studentId);

  const startAt = new Date("2026-01-01T00:00:00.000Z");
  for (const t of SEED_TESTS) {
    await db.test.create({
      data: {
        id: t.id,
        title: t.title,
        description: t.description,
        duration: t.duration,
        price: t.price,
        userId: teacherId,
        startAt,
        published: t.published,
        questions: {
          create: t.questions.map((q) => ({
            question: q.question,
            options: q.options,
            type: q.type,
            answer: q.answer,
          })),
        },
      },
    });
  }

  // Student: a completed result on the first test (8 of 10 correct)
  const done = SEED_TESTS[0];
  const wrongAt = new Set([2, 7]);
  const pickWrong = (q: Q) =>
    q.type === "Descriptive"
      ? "I am not sure."
      : q.options.find((_, i) => i !== q.answer) || "";
  await db.payment.create({
    data: {
      userId: studentId,
      testId: done.id,
      amount: done.price,
      status: "completed",
    },
  });
  await db.testResult.create({
    data: {
      userId: studentId,
      testId: done.id,
      totalScore: String(done.questions.length),
      gotScore: String(done.questions.length - wrongAt.size),
      questions: {
        create: done.questions.map((q, i) => ({
          question: q.question,
          userAnswer: wrongAt.has(i) ? pickWrong(q) : answerText(q),
          correctAnswer: answerText(q),
          options: q.options,
          type: q.type,
          score: wrongAt.has(i) ? "0" : "1",
          description: wrongAt.has(i)
            ? SAMPLE_FEEDBACK.wrong
            : SAMPLE_FEEDBACK.right,
        })),
      },
    },
  });

  // Student: one purchased test, ready to take
  const bought = SEED_TESTS[3];
  await db.payment.create({
    data: {
      userId: studentId,
      testId: bought.id,
      amount: bought.price,
      status: "completed",
    },
  });
}

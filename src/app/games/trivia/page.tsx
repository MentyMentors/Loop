"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Shape of a single question object returned by opentdb.com. */
interface OpenTdbQuestion {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface OpenTdbResponse {
  response_code: number;
  results: OpenTdbQuestion[];
}

/** A question after decoding entities and shuffling answers, ready to render. */
interface PreparedQuestion {
  question: string;
  answers: string[];
  correctAnswer: string;
  category: string;
  difficulty: OpenTdbQuestion["difficulty"];
}

const TRIVIA_API_URL =
  "https://opentdb.com/api.php?amount=1&type=multiple";

/**
 * Decodes HTML entities (e.g. `&quot;`, `&#039;`, `&amp;`) that opentdb.com
 * escapes in every question/answer string. Uses the browser's own HTML
 * parser rather than a manual regex table, so it handles the full range of
 * named and numeric entities correctly.
 */
function decodeHtmlEntities(raw: string): string {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(raw, "text/html").documentElement
    .textContent;
  return decoded ?? raw;
}

/** Fisher-Yates shuffle; returns a new array, does not mutate the input. */
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i]!;
    result[i] = result[j]!;
    result[j] = temp;
  }
  return result;
}

function prepareQuestion(raw: OpenTdbQuestion): PreparedQuestion {
  const correctAnswer = decodeHtmlEntities(raw.correct_answer);
  const incorrectAnswers = raw.incorrect_answers.map(decodeHtmlEntities);

  return {
    question: decodeHtmlEntities(raw.question),
    answers: shuffle([correctAnswer, ...incorrectAnswers]),
    correctAnswer,
    category: decodeHtmlEntities(raw.category),
    difficulty: raw.difficulty,
  };
}

type AnswerState = "unanswered" | "correct" | "incorrect";

export default function TriviaPage(): React.ReactElement {
  const [currentQuestion, setCurrentQuestion] =
    useState<PreparedQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [score, setScore] = useState<number>(0);
  const [questionsSeen, setQuestionsSeen] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSelectedAnswer(null);
    setAnswerState("unanswered");

    try {
      const response = await fetch(TRIVIA_API_URL, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Trivia API responded with ${response.status}`);
      }

      const payload: OpenTdbResponse = await response.json();

      if (payload.response_code !== 0 || payload.results.length === 0) {
        throw new Error("No trivia question was returned. Please retry.");
      }

      const [rawQuestion] = payload.results;
      setCurrentQuestion(prepareQuestion(rawQuestion as OpenTdbQuestion));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong loading a question.",
      );
      setCurrentQuestion(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchQuestion();
  }, [fetchQuestion]);

  const handleSelectAnswer = useCallback(
    (answer: string): void => {
      if (answerState !== "unanswered" || !currentQuestion) {
        return;
      }

      const isCorrect = answer === currentQuestion.correctAnswer;
      setSelectedAnswer(answer);
      setAnswerState(isCorrect ? "correct" : "incorrect");
      setQuestionsSeen((prev) => prev + 1);
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
    },
    [answerState, currentQuestion],
  );

  const handleNextQuestion = useCallback((): void => {
    void fetchQuestion();
  }, [fetchQuestion]);

  const scoreLabel = useMemo(
    () => `${score} / ${questionsSeen}`,
    [score, questionsSeen],
  );

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-12">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to lounge
        </Link>
        <span className="text-sm font-medium">Score: {scoreLabel}</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Trivia Challenge</CardTitle>
          <CardDescription>
            {currentQuestion
              ? `${currentQuestion.category} · ${currentQuestion.difficulty}`
              : "Loading a question for you..."}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoading && error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {!isLoading && !error && currentQuestion && (
            <>
              <p className="text-base font-medium">
                {currentQuestion.question}
              </p>

              <div className="flex flex-col gap-2">
                {currentQuestion.answers.map((answer) => {
                  const isSelected = selectedAnswer === answer;
                  const isCorrectAnswer =
                    answer === currentQuestion.correctAnswer;

                  const showCorrect =
                    answerState !== "unanswered" && isCorrectAnswer;
                  const showIncorrect =
                    answerState === "incorrect" && isSelected;

                  return (
                    <button
                      key={answer}
                      type="button"
                      disabled={answerState !== "unanswered"}
                      onClick={() => handleSelectAnswer(answer)}
                      className={cn(
                        "rounded-md border border-input px-4 py-2 text-left text-sm transition-colors",
                        "disabled:cursor-not-allowed",
                        answerState === "unanswered" &&
                          "hover:bg-accent hover:text-accent-foreground",
                        showCorrect &&
                          "border-green-600 bg-green-50 text-green-900",
                        showIncorrect &&
                          "border-destructive bg-destructive/10 text-destructive",
                      )}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>

              {answerState !== "unanswered" && (
                <p
                  className={cn(
                    "text-sm font-medium",
                    answerState === "correct"
                      ? "text-green-700"
                      : "text-destructive",
                  )}
                >
                  {answerState === "correct"
                    ? "Correct!"
                    : `Not quite. The correct answer was "${currentQuestion.correctAnswer}".`}
                </p>
              )}
            </>
          )}
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleNextQuestion}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Loading..." : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

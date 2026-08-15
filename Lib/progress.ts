import { Attempt, CompetitionProblem, Result } from "@prisma/client";
import { count } from "console";

export function calculateProgress(
  attempts: Attempt[],
  problems: CompetitionProblem[],
) {
  const completedProblems = new Set(
    attempts
      .filter((attempt) => attempt.result === Result.TOP)
      .map((attempt) => attempt.competitionProblemId),
  );

  return {
    completed: completedProblems.size,
    total: problems.length,
    percentage: (completedProblems.size / problems.length) * 100,
  };
}

export function calculateAttemptedProblems(attempts: Attempt[]) {
  const attemptedProblems = new Set(
    attempts.map((attempt) => attempt.competitionProblemId),
  );
  return attemptedProblems.size;
}

export function calculateProblemStatuses(
  problems: CompetitionProblem[],
  attempts: Attempt[],
) {
  return problems.map((problem) => {
    const problemAttempts = attempts.filter(
      (attempt) => attempt.competitionProblemId === problem.id,
    );

    const completed = problemAttempts.some(
      (attempt) => attempt.result === Result.TOP,
    );

    const attempted = problemAttempts.length > 0;

    const status: ProblemStatus = completed
      ? "COMPLETED"
      : attempted
        ? "ATTEMPTED"
        : "UNATTEMPTED";

    return {
      problem,
      status,
    };
  });
}

export type ProblemStatus = "COMPLETED" | "ATTEMPTED" | "UNATTEMPTED";

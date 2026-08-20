import { CompetitionEntryWithAttempts } from "@/types/competition";
import { CompetitionCategory, Attempt, Result } from "@prisma/client";

export function calculateLeaderboards(
  entries: CompetitionEntryWithAttempts[],
  categories: CompetitionCategory[],
) {
  const leaderboard = entries.map((entry) => {
    const score = calculateScore(entry.attempts);

    return {
      user: entry.user,
      category: entry.category,
      score,
    };
  });

  const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);

  return categories.map((category) => ({
    category,
    entries: sortedLeaderboard.filter(
      (entry) => entry.category.id === category.id,
    ),
  }));
}

export function calculateScore(attempts: Attempt[]) {
  const points: Record<number, number> = {
    1: 10,
    2: 7,
    3: 5,
    4: 3,
  };

  let score = 0;

  const problemIds = [
    ...new Set(attempts.map((attempt) => attempt.competitionProblemId)),
  ];

  for (const problemId of problemIds) {
    const problemAttempts = attempts
      .filter((attempt) => attempt.competitionProblemId === problemId)
      .sort((a, b) => a.recordedAt.getTime() - b.recordedAt.getTime());

    const topAttemptIndex = problemAttempts.findIndex(
      (attempt) => attempt.result === Result.TOP,
    );

    if (topAttemptIndex === -1) {
      continue;
    }

    const attemptNumber = topAttemptIndex + 1;

    score += points[attemptNumber] ?? 1;
  }

  return score;
}

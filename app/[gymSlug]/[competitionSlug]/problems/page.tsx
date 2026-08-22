import { auth } from "@/auth";
import CompetitionProgressCard from "@/components/CompetitionProgressCard";
import ProblemsList from "@/components/ProblemsList";
import { getCompetition, getCompetitionEntry } from "@/Lib/competition";
import { calculateScore } from "@/Lib/leaderboard";
import {
  calculateAttemptedProblems,
  calculateProblemStatuses,
  calculateProgress,
} from "@/Lib/progress";
import { notFound } from "next/navigation";

const problems = async ({
  params,
}: {
  params: Promise<{ gymSlug: string; competitionSlug: string }>;
}) => {
  const { gymSlug, competitionSlug } = await params;
  const competition = await getCompetition(gymSlug, competitionSlug);

  if (!competition) {
    notFound();
  }

  const session = await auth();
  const userId = session?.user?.id;

  const entry = userId
    ? await getCompetitionEntry(competition.id, userId)
    : null;

  if (!entry) {
    return <>You need to enter this competition</>;
  }

  const problemStatuses = calculateProblemStatuses(
    competition.problems,
    entry.attempts,
  );

  return (
    <main className="m-2 flex h-screen flex-col">
      <div className="items-center flex flex-col shrink-0">
        <h1 className="text-xl font-bold ">{competition.name}</h1>
        <h2>{competition.gym.name}</h2>
      </div>
      {entry && (
        <>
          <div className="shrink-0">
            <CompetitionProgressCard
              progress={calculateProgress(entry.attempts, competition.problems)}
              attemptedProblems={calculateAttemptedProblems(entry.attempts)}
              problemStatuses={problemStatuses}
              score={calculateScore(entry.attempts)}
            />
          </div>
          <h1 className="font-extrabold text-3xl my-5 shrink-0">Problems</h1>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ProblemsList problemStatuses={problemStatuses} />
          </div>
        </>
      )}
    </main>
  );
};

export default problems;

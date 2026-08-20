import { auth } from "@/auth";
import CompetitionProgressCard from "@/components/CompetitionProgressCard";
import ProblemsList from "@/components/ProblemsList";
import { getCompetition, getCompetitionEntry } from "@/Lib/competition";
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

  return (
    <main className="m-2">
      <div className="items-center flex flex-col">
        <h1 className="text-xl font-bold ">{competition.name}</h1>
        <h2>{competition.gym.name}</h2>
      </div>
      {entry && (
        <>
          <CompetitionProgressCard
            progress={calculateProgress(entry.attempts, competition.problems)}
            attemptedProblems={calculateAttemptedProblems(entry.attempts)}
            problemStatuses={calculateProblemStatuses(
              competition.problems,
              entry.attempts,
            )}
          />
          <h1 className="font-extrabold text-3xl my-5">Problems</h1>
          <ProblemsList
            problemStatuses={calculateProblemStatuses(
              competition.problems,
              entry.attempts,
            )}
          />
        </>
      )}
    </main>
  );
};

export default problems;

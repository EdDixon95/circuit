import { auth } from "@/auth";
import CompetitionHomeInfo from "@/components/CompetitionHeader";
import CompetitionInfoCard from "@/components/CompetitionInfoCard";
import CompetitionProblemsCard from "@/components/CompetitionProblemsCard";
import CompetitionProgressCard from "@/components/CompetitionProgressCard";
import CompetitionRegistration from "@/components/CompetitionRegistration";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import { getCompetition, getCompetitionEntry } from "@/Lib/competition";
import { calculateLeaderboards, calculateScore } from "@/Lib/leaderboard";
import {
  calculateAttemptedProblems,
  calculateProblemStatuses,
  calculateProgress,
} from "@/Lib/progress";

import { notFound } from "next/navigation";

const EventDetailsPage = async ({
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

  const leaderboards = calculateLeaderboards(
    competition.entries,
    competition.categories,
  );

  return (
    <main className="m-2">
      <CompetitionHomeInfo competition={competition} />

      {entry ? (
        <>
          <CompetitionProgressCard
            progress={calculateProgress(entry.attempts, competition.problems)}
            attemptedProblems={calculateAttemptedProblems(entry.attempts)}
            problemStatuses={calculateProblemStatuses(
              competition.problems,
              entry.attempts,
            )}
            score={calculateScore(entry.attempts)}
          />
          <CompetitionProblemsCard
            problemStatuses={calculateProblemStatuses(
              competition.problems,
              entry.attempts,
            )}
            gymSlug={gymSlug}
            competitionSlug={competitionSlug}
          />
        </>
      ) : (
        <>
          <CompetitionInfoCard competition={competition} />
          <CompetitionRegistration
            competitionId={competition.id}
            categories={competition.categories}
          />
        </>
      )}
      <LeaderboardPreview leaderboards={leaderboards} />
    </main>
  );
};
export default EventDetailsPage;

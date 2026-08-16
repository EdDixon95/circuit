import { auth } from "@/auth";
import CompetitionHomeInfo from "@/components/CompetitionHeader";
import CompetitionInfoCard from "@/components/CompetitionInfoCard";
import CompetitionProblemsCard from "@/components/CompetitionProblemsCard";
import CompetitionProgressCard from "@/components/CompetitionProgressCard";
import CompetitionRegistration from "@/components/CompetitionRegistration";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import { calculateLeaderboards, calculateScore } from "@/Lib/leaderboard";
import { prisma } from "@/Lib/prisma";
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

  const competition = await prisma.competition.findFirst({
    where: {
      slug: competitionSlug,
      gym: {
        slug: gymSlug,
      },
    },
    include: {
      gym: true,
      categories: true,
      problems: true,
      competitionType: true,
      entries: {
        include: {
          user: true,
          category: true,
          attempts: true,
        },
      },
      _count: {
        select: {
          entries: true,
          problems: true,
        },
      },
    },
  });

  if (!competition) {
    notFound();
  }

  const session = await auth();

  const entry = session
    ? await prisma.competitionEntry.findUnique({
        where: {
          competitionId_userId: {
            competitionId: competition.id,
            userId: session.user.id,
          },
        },
        include: {
          attempts: true,
        },
      })
    : null;

  const leaderboards = calculateLeaderboards(
    competition.entries,
    competition.categories,
  );

  return (
    <main className="m-1">
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
          />
          <CompetitionProblemsCard
            problemStatuses={calculateProblemStatuses(
              competition.problems,
              entry.attempts,
            )}
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

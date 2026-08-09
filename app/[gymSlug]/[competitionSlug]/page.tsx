import CompetitionHomeInfo from "@/components/CompetitionHeader";
import CompetitionInfoCard from "@/components/CompetitionInfoCard";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import { calculateLeaderboards, calculateScore } from "@/Lib/leaderboard";
import { prisma } from "@/Lib/prisma";

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

  const leaderboards = calculateLeaderboards(
    competition.entries,
    competition.categories,
  );

  return (
    <main className="m-1">
      <CompetitionHomeInfo competition={competition} />
      <button className="mt-6 w-full rounded-xl bg-green-600 py-3.5 text-lg font-semibold text-white transition hover:bg-green-700">
        Register / Enter Competition
      </button>
      <CompetitionInfoCard competition={competition} />
      <LeaderboardPreview leaderboards={leaderboards} />
    </main>
  );
};
export default EventDetailsPage;

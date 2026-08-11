"use client";

import { Leaderboard } from "@/types/competition";
import LeaderboardPreviewCard from "./LeaderboardPreviewCard";

interface Props {
  leaderboards: Leaderboard[];
}

const LeaderboardPreview = ({ leaderboards }: Props) => {
  return (
    <section className="w-full">
      <h2 className="mb-4 mt-4 text-xl font-semibold">Leaderboard</h2>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {leaderboards.map((leaderboard) => (
          <LeaderboardPreviewCard
            key={leaderboard.category.id}
            leaderboard={leaderboard}
          />
        ))}
      </div>
    </section>
  );
};

export default LeaderboardPreview;

import { Prisma } from "@prisma/client";

import { User, CompetitionCategory } from "@/app/generated/prisma/client";

export interface LeaderboardEntry {
  user: User;
  category: CompetitionCategory;
  score: number;
}

export interface Leaderboard {
  category: CompetitionCategory;
  entries: LeaderboardEntry[];
}

export type CompetitionWithGym = Prisma.CompetitionGetPayload<{
  include: {
    gym: true;
    categories: true;
    problems: true;
    _count: {
      select: {
        entries: true;
        problems: true;
      };
    };
  };
}>;

export type CompetitionEntryWithAttempts = Prisma.CompetitionEntryGetPayload<{
  include: {
    user: true;
    category: true;
    attempts: true;
  };
}>;

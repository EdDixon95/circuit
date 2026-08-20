import { prisma } from "@/Lib/prisma";

export async function getCompetition(gymSlug: string, competitionSlug: string) {
  return await prisma.competition.findFirst({
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
}

export async function getCompetitionEntry(
  competitionId: string,
  userId: string,
) {
  return prisma.competitionEntry.findUnique({
    where: {
      competitionId_userId: {
        competitionId,
        userId,
      },
    },
    include: {
      attempts: true,
    },
  });
}

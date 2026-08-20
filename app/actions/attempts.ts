"use server";

import { auth } from "@/auth";
import { prisma } from "@/Lib/prisma";
import { Result } from "@prisma/client";

export async function logAttempt(competitionProblemId: string, result: Result) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in");
  }

  const problem = await prisma.competitionProblem.findUnique({
    where: {
      id: competitionProblemId,
    },
  });

  if (!problem) {
    throw new Error("Problem not found");
  }

  const entry = await prisma.competitionEntry.findUnique({
    where: {
      competitionId_userId: {
        competitionId: problem.competitionId,
        userId: session.user.id,
      },
    },
  });

  if (!entry) {
    throw new Error("You are not registered for this competition");
  }

  await prisma.attempt.create({
    data: {
      competitionEntryId: entry.id,
      competitionProblemId,
      result,
    },
  });
}

export async function resetProblemAttempts(competitionProblemId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const problem = await prisma.competitionProblem.findUnique({
    where: {
      id: competitionProblemId,
    },
  });

  if (!problem) {
    throw new Error("Problem not found");
  }

  const entry = await prisma.competitionEntry.findUnique({
    where: {
      competitionId_userId: {
        competitionId: problem.competitionId,
        userId: session.user.id,
      },
    },
  });

  if (!entry) {
    ("You are not registered for this competition");
  }

  await prisma.attempt.deleteMany({
    where: {
      competitionEntryId: entry?.id,
      competitionProblemId,
    },
  });
}

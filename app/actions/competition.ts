"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/Lib/prisma";

export async function registerForCompetition(
  competitionId: string,
  categoryId: string,
  path: string,
) {
  const session = await auth();
  console.log("session: ", session);

  if (!session) {
    throw new Error("You must be logged in to enter");
  }

  const entry = await prisma.competitionEntry.create({
    data: {
      competitionId,
      categoryId,
      userId: session.user.id,
    },
  });

  revalidatePath(path);

  return entry;
}

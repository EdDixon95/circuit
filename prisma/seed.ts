import {
  PrismaClient,
  Status,
  StaffRole,
  Result,
  Gym,
  CompetitionType,
  Attempt,
  Competition,
  CompetitionCategory,
  CompetitionEntry,
  GymStaff,
  CompetitionProblem,
  User,
} from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const competitionTypes = await seedCompetitionTypes();
  const gyms = await seedGyms();
  const competitions = await seedCompetitions(gyms, competitionTypes);
  const competitionCategories = await seedCompetitionCategories(competitions);
  const competitionProblems = await seedProblems(competitions);
  const users = await seedUsers();
  const gymStaff = await seedGymStaff(gyms, users);
  const competitionEntries = await seedCompetitionEntries(
    competitions,
    users,
    competitionCategories,
  );
  const attempts = await seedAttempts(competitionEntries, competitionProblems);
  console.log("✅ Database seeded!");
}

async function seedCompetitionTypes() {
  const types = [
    {
      name: "Boulder League",
      description: "Season-long league competition",
    },
    {
      name: "Fun Competition",
      description: "Friendly competition for everyone",
    },
    {
      name: "Redpoint",
      description: "Unlimited attempts over the competition period",
    },
    {
      name: "Flash",
      description: "One attempt per problem",
    },
    {
      name: "Youth Competition",
      description: "Competition for younger climbers",
    },
  ];

  const competitionTypes = [];

  for (const type of types) {
    const competitionType = await prisma.competitionType.upsert({
      where: { name: type.name },
      update: {},
      create: type,
    });
    competitionTypes.push(competitionType);
  }
  return competitionTypes;
}

async function seedGyms() {
  const gyms = [
    {
      name: "Climbing Hut",
      slug: "climbing-hut",
      city: "Ellesmere Port",
      country: "United Kingdom",
      email: "info@climbinghut.co.uk",
      logoUrl: "/logos/climbing-hut-logo.png",
    },
    {
      name: "The Climbing Hangar",
      slug: "the-climbing-hangar",
      city: "Liverpool",
      country: "United Kingdom",
      email: "info@climbinghangar.co.uk",
    },
  ];

  const createdGyms = [];

  for (const gym of gyms) {
    const createdGym = await prisma.gym.upsert({
      where: { slug: gym.slug },
      update: { logoUrl: gym.logoUrl },
      create: gym,
    });
    createdGyms.push(createdGym);
  }

  return createdGyms;
}

async function seedCompetitions(
  gyms: Gym[],
  competitionTypes: CompetitionType[],
) {
  const competitions = [
    {
      gymId: gyms[0].id,
      name: "Winter Boulder League",
      competitionTypeId: competitionTypes[0].id,
      slug: "winter-boulder-league",
      startDate: new Date("2027-01-01"),
      endDate: new Date("2027-03-31"),
      registrationOpen: new Date("2026-12-01"),
      registrationClose: new Date("2026-12-31"),
      status: Status.OPEN,
      description:
        "Celebrate the start of the new year with our Winter Boulder League. Challenge yourself on 25 new problems, compete with friends and see how you rank across the season.",
    },
    {
      gymId: gyms[1].id,
      name: "Flash Comp",
      competitionTypeId: competitionTypes[2].id,
      slug: "flash",
      startDate: new Date("2027-01-01"),
      endDate: new Date("2027-01-01"),
      registrationOpen: new Date("2026-12-01"),
      registrationClose: new Date("2026-12-31"),
      status: Status.OPEN,
      description: "Flash the boulders, one attempt each, make it count!",
    },
  ];

  const createdCompetitions = [];

  for (const competition of competitions) {
    const createdCompetition = await prisma.competition.upsert({
      where: {
        gymId_slug: { gymId: competition.gymId, slug: competition.slug },
      },
      update: {},
      create: competition,
    });
    createdCompetitions.push(createdCompetition);
  }
  return createdCompetitions;
}

async function seedCompetitionCategories(competitions: Competition[]) {
  const categories = [
    {
      competitionId: competitions[0].id,
      name: "Male",
      description: "Open Male Category",
    },
    {
      competitionId: competitions[0].id,
      name: "Female",
      description: "Open Female Category",
    },
    {
      competitionId: competitions[0].id,
      name: "Youth Male",
      description: "U18 Male Category",
    },
    {
      competitionId: competitions[0].id,
      name: "Youth Female",
      description: "U18 Female Category",
    },
    {
      competitionId: competitions[1].id,
      name: "Open",
      description: "Open Category",
    },
  ];

  const createdCategories = [];

  for (const category of categories) {
    const createdCategory = await prisma.competitionCategory.upsert({
      where: {
        competitionId_name: {
          competitionId: category.competitionId,
          name: category.name,
        },
      },
      update: {},
      create: category,
    });
    createdCategories.push(createdCategory);
  }
  return createdCategories;
}

async function seedProblems(competitions: Competition[]) {
  const problems = [
    {
      competitionId: competitions[0].id,
      problemNumber: 1,
      grade: "V0",
      colour: "red",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 2,
      grade: "V0",
      colour: "blue",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 3,
      grade: "V1",
      colour: "green",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 4,
      grade: "V1",
      colour: "yellow",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 5,
      grade: "V1",
      colour: "purple",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 6,
      grade: "V2",
      colour: "orange",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 7,
      grade: "V2",
      colour: "pink",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 8,
      grade: "V2",
      colour: "brown",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 9,
      grade: "V3",
      colour: "white",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 10,
      grade: "V3",
      colour: "black",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 11,
      grade: "V4",
      colour: "red",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 12,
      grade: "V4",
      colour: "blue",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 13,
      grade: "V5",
      colour: "green",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 14,
      grade: "V5",
      colour: "yellow",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 15,
      grade: "V6",
      colour: "purple",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 16,
      grade: "V6",
      colour: "orange",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 17,
      grade: "V6",
      colour: "pink",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 18,
      grade: "V7",
      colour: "brown",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 19,
      grade: "V7",
      colour: "white",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 20,
      grade: "V8",
      colour: "black",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 21,
      grade: "V8",
      colour: "red",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 22,
      grade: "V8",
      colour: "blue",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 23,
      grade: "V9",
      colour: "green",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 24,
      grade: "V9",
      colour: "yellow",
    },
    {
      competitionId: competitions[0].id,
      problemNumber: 25,
      grade: "V10",
      colour: "purple",
    },
  ];
  const createdProblems: CompetitionProblem[] = [];

  for (const problem of problems) {
    const createdProblem = await prisma.competitionProblem.upsert({
      where: {
        competitionId_problemNumber: {
          competitionId: problem.competitionId,
          problemNumber: problem.problemNumber,
        },
      },
      update: {},
      create: problem,
    });
    createdProblems.push(createdProblem);
  }
  return createdProblems;
}

async function seedUsers() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      passwordHash,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      passwordHash,
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      passwordHash,
    },
    {
      firstName: "Bob",
      lastName: "Williams",
      email: "bob.williams@example.com",
      passwordHash,
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie.brown@example.com",
      passwordHash,
    },
    {
      firstName: "Emily",
      lastName: "Taylor",
      email: "emily.taylor@example.com",
      passwordHash,
    },
    {
      firstName: "Jack",
      lastName: "Wilson",
      email: "jack.wilson@example.com",
      passwordHash,
    },
    {
      firstName: "Sophie",
      lastName: "Davies",
      email: "sophie.davies@example.com",
      passwordHash,
    },
    {
      firstName: "Harry",
      lastName: "Evans",
      email: "harry.evans@example.com",
      passwordHash,
    },
    {
      firstName: "Olivia",
      lastName: "Thomas",
      email: "olivia.thomas@example.com",
      passwordHash,
    },
    {
      firstName: "George",
      lastName: "Roberts",
      email: "george.roberts@example.com",
      passwordHash,
    },
    {
      firstName: "Lucy",
      lastName: "Walker",
      email: "lucy.walker@example.com",
      passwordHash,
    },
    {
      firstName: "James",
      lastName: "Wright",
      email: "james.wright@example.com",
      passwordHash,
    },
    {
      firstName: "Ella",
      lastName: "Thompson",
      email: "ella.thompson@example.com",
      passwordHash,
    },
    {
      firstName: "Thomas",
      lastName: "White",
      email: "thomas.white@example.com",
      passwordHash,
    },
    {
      firstName: "Grace",
      lastName: "Hughes",
      email: "grace.hughes@example.com",
      passwordHash,
    },
  ];

  const createdUsers: User[] = [];

  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        passwordHash,
      },
      create: user,
    });

    createdUsers.push(createdUser);
  }

  return createdUsers;
}

async function seedGymStaff(gyms: Gym[], users: User[]) {
  const gymStaff = [
    {
      gymId: gyms[0].id,
      userId: users[0].id,
      role: StaffRole.ADMIN,
    },
    {
      gymId: gyms[0].id,
      userId: users[1].id,
      role: StaffRole.STAFF,
    },
  ];

  const createdGymStaff: GymStaff[] = [];

  for (const staff of gymStaff) {
    const createdStaff = await prisma.gymStaff.upsert({
      where: { gymId_userId: { gymId: staff.gymId, userId: staff.userId } },
      update: {},
      create: staff,
    });
    createdGymStaff.push(createdStaff);
  }
  return createdGymStaff;
}

async function seedCompetitionEntries(
  competitions: Competition[],
  users: User[],
  competitionCategories: CompetitionCategory[],
) {
  const entries = [
    // Male
    {
      competitionId: competitions[0].id,
      userId: users[0].id,
      categoryId: competitionCategories[0].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[1].id,
      categoryId: competitionCategories[0].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[2].id,
      categoryId: competitionCategories[0].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[3].id,
      categoryId: competitionCategories[0].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[4].id,
      categoryId: competitionCategories[0].id,
    },

    // Female
    {
      competitionId: competitions[0].id,
      userId: users[5].id,
      categoryId: competitionCategories[1].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[6].id,
      categoryId: competitionCategories[1].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[7].id,
      categoryId: competitionCategories[1].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[8].id,
      categoryId: competitionCategories[1].id,
    },

    // Youth Male
    {
      competitionId: competitions[0].id,
      userId: users[9].id,
      categoryId: competitionCategories[2].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[10].id,
      categoryId: competitionCategories[2].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[11].id,
      categoryId: competitionCategories[2].id,
    },

    // Youth Female
    {
      competitionId: competitions[0].id,
      userId: users[12].id,
      categoryId: competitionCategories[3].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[13].id,
      categoryId: competitionCategories[3].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[14].id,
      categoryId: competitionCategories[3].id,
    },
    {
      competitionId: competitions[0].id,
      userId: users[15].id,
      categoryId: competitionCategories[3].id,
    },
  ];

  const createdEntries: CompetitionEntry[] = [];

  for (const entry of entries) {
    const createdEntry = await prisma.competitionEntry.upsert({
      where: {
        competitionId_userId: {
          competitionId: entry.competitionId,
          userId: entry.userId,
        },
      },
      update: {},
      create: entry,
    });

    createdEntries.push(createdEntry);
  }

  return createdEntries;
}

async function seedAttempts(
  competitionEntries: CompetitionEntry[],
  competitionProblems: CompetitionProblem[],
) {
  const attempts = [
    // =========================================================
    // JOHN - Strongest
    // =========================================================

    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[5].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[6].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[7].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[8].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[0].id,
      competitionProblemId: competitionProblems[9].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // JANE - Very strong
    // =========================================================

    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[5].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[6].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[7].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[8].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[1].id,
      competitionProblemId: competitionProblems[9].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // ALICE - Strong / mid-high
    // =========================================================

    {
      competitionEntryId: competitionEntries[2].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[2].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[2].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[2].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[2].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 4,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[2].id,
      competitionProblemId: competitionProblems[5].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[2].id,
      competitionProblemId: competitionProblems[6].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[2].id,
      competitionProblemId: competitionProblems[7].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // BOB - Average
    // =========================================================

    {
      competitionEntryId: competitionEntries[3].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[3].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[3].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[3].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 4,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[3].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[3].id,
      competitionProblemId: competitionProblems[5].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[3].id,
      competitionProblemId: competitionProblems[6].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // CHARLIE - Weaker
    // =========================================================

    {
      competitionEntryId: competitionEntries[4].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[4].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 4,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[4].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[4].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 5,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[4].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[4].id,
      competitionProblemId: competitionProblems[5].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // EMILY
    // =========================================================

    {
      competitionEntryId: competitionEntries[5].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[5].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[5].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[5].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[5].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[5].id,
      competitionProblemId: competitionProblems[5].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[5].id,
      competitionProblemId: competitionProblems[6].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // JACK
    // =========================================================

    {
      competitionEntryId: competitionEntries[6].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[6].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[6].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[6].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[6].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[6].id,
      competitionProblemId: competitionProblems[5].id,
      attemptNumber: 4,
      result: Result.TOP,
    },

    // =========================================================
    // SOPHIE
    // =========================================================

    {
      competitionEntryId: competitionEntries[7].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[7].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[7].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[7].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[7].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[7].id,
      competitionProblemId: competitionProblems[5].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // HARRY
    // =========================================================

    {
      competitionEntryId: competitionEntries[8].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[8].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 4,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[8].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[8].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[8].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // OLIVIA
    // =========================================================

    {
      competitionEntryId: competitionEntries[9].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[9].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[9].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[9].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[9].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // GEORGE
    // =========================================================

    {
      competitionEntryId: competitionEntries[10].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[10].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[10].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 4,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[10].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[10].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // LUCY
    // =========================================================

    {
      competitionEntryId: competitionEntries[11].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[11].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[11].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[11].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // JAMES
    // =========================================================

    {
      competitionEntryId: competitionEntries[12].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[12].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[12].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[12].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 2,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[12].id,
      competitionProblemId: competitionProblems[4].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // ELLA
    // =========================================================

    {
      competitionEntryId: competitionEntries[13].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[13].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 2,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[13].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 1,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[13].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // THOMAS
    // =========================================================

    {
      competitionEntryId: competitionEntries[14].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 3,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[14].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 4,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[14].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[14].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.NONE,
    },

    // =========================================================
    // GRACE
    // =========================================================

    {
      competitionEntryId: competitionEntries[15].id,
      competitionProblemId: competitionProblems[0].id,
      attemptNumber: 4,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[15].id,
      competitionProblemId: competitionProblems[1].id,
      attemptNumber: 5,
      result: Result.TOP,
    },
    {
      competitionEntryId: competitionEntries[15].id,
      competitionProblemId: competitionProblems[2].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
    {
      competitionEntryId: competitionEntries[15].id,
      competitionProblemId: competitionProblems[3].id,
      attemptNumber: 1,
      result: Result.NONE,
    },
  ];

  const createdAttempts: Attempt[] = [];

  for (const attempt of attempts) {
    const createdAttempt = await prisma.attempt.upsert({
      where: {
        competitionEntryId_competitionProblemId_attemptNumber: {
          competitionEntryId: attempt.competitionEntryId,
          competitionProblemId: attempt.competitionProblemId,
          attemptNumber: attempt.attemptNumber,
        },
      },
      update: {},
      create: attempt,
    });

    createdAttempts.push(createdAttempt);
  }

  return createdAttempts;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

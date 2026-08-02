
import { PrismaClient, Status, Gym, CompetitionType, Competition, CompetitionCategory, CompetitionProblem } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const competitionTypes = await seedCompetitionTypes();
  const gyms = await seedGyms();
  const competitions = await seedCompetitions(gyms, competitionTypes);
  const competitionCategories = await seedCompetitionCategories(competitions);
  const competitionProblems = await seedProblems(competitions);
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

    const competitionTypes = []

    for (const type of types) {const competitionType = await prisma.competitionType.upsert({
        where: { name: type.name },
        update: {},
        create: type
        
        
    });
    competitionTypes.push(competitionType);
}return competitionTypes;
}

async function seedGyms() {
  const gyms = [
    {
      name: "Climbing Hut",
      slug: "climbing-hut",
      city: "Ellesmere Port",
      country: "United Kingdom",
      email: "info@climbinghut.co.uk",
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
      update: {},
      create: gym,
    });
    createdGyms.push(createdGym);
  }

  return createdGyms;
}

async function seedCompetitions(gyms: Gym[], competitionTypes: CompetitionType[]   ) {
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
            status: Status.OPEN
        }
    ]

    const createdCompetitions = [];

    for (const competition of competitions) {
        const createdCompetition = await prisma.competition.upsert({
            where: { gymId_slug: { gymId: competition.gymId, slug: competition.slug } },
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
    ];

    const createdCategories = [];

    for (const category of categories) {
        const createdCategory = await prisma.competitionCategory.upsert({
            where: { competitionId_name: {competitionId: category.competitionId, name: category.name } },
            update: {},
            create: category,
        });
        createdCategories.push(createdCategory);
    }
    return createdCategories;
    }

async function seedProblems(competitions: Competition[]) {
    const problems = [
        {competitionId: competitions[0].id, problemNumber: 1, grade: "V0", colour: "red"},
        {competitionId: competitions[0].id, problemNumber: 2, grade: "V0", colour: "blue"},
        {competitionId: competitions[0].id, problemNumber: 3, grade: "V1", colour: "green"},
        {competitionId: competitions[0].id, problemNumber: 4, grade: "V1", colour: "yellow"},
        {competitionId: competitions[0].id, problemNumber: 5, grade: "V1", colour: "purple"},
        {competitionId: competitions[0].id, problemNumber: 6, grade: "V2", colour: "orange"},
        {competitionId: competitions[0].id, problemNumber: 7, grade: "V2", colour: "pink"},
        {competitionId: competitions[0].id, problemNumber: 8, grade: "V2", colour: "brown"},
        {competitionId: competitions[0].id, problemNumber: 9, grade: "V3", colour: "white"},
        {competitionId: competitions[0].id, problemNumber: 10, grade: "V3", colour: "black"},
        {competitionId: competitions[0].id, problemNumber: 11, grade: "V4", colour: "red"},
        {competitionId: competitions[0].id, problemNumber: 12, grade: "V4", colour: "blue"},
        {competitionId: competitions[0].id, problemNumber: 13, grade: "V5", colour: "green"},
        {competitionId: competitions[0].id, problemNumber: 14, grade: "V5", colour: "yellow"},
        {competitionId: competitions[0].id, problemNumber: 15, grade: "V6", colour: "purple"},
        {competitionId: competitions[0].id, problemNumber: 16, grade: "V6", colour: "orange"},
        {competitionId: competitions[0].id, problemNumber: 17, grade: "V6", colour: "pink"},
        {competitionId: competitions[0].id, problemNumber: 18, grade: "V7", colour: "brown"},
        {competitionId: competitions[0].id, problemNumber: 19, grade: "V7", colour: "white"},
        {competitionId: competitions[0].id, problemNumber: 20, grade: "V8", colour: "black"},
        {competitionId: competitions[0].id, problemNumber: 21, grade: "V8", colour: "red"},
        {competitionId: competitions[0].id, problemNumber: 22, grade: "V8", colour: "blue"},
        {competitionId: competitions[0].id, problemNumber: 23, grade: "V9", colour: "green"},
        {competitionId: competitions[0].id, problemNumber: 24, grade: "V9", colour: "yellow"},
        {competitionId: competitions[0].id, problemNumber: 25, grade: "V10", colour: "purple"},
    ];
    const createdProblems : CompetitionProblem[] = [];

    for (const problem of problems) {
        const createdProblem = await prisma.competitionProblem.upsert({
            where: { competitionId_problemNumber: { competitionId: problem.competitionId, problemNumber: problem.problemNumber } },
            update: {},
            create: problem,
        });
        createdProblems.push(createdProblem);
    }
    return createdProblems;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
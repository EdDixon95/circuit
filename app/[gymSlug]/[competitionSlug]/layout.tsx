import CompetitionNavbar from "@/components/CompetitionNavbar";

const CompetitionLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    gymSlug: string;
    competitionSlug: string;
  }>;
}) => {
  const { gymSlug, competitionSlug } = await params;

  return (
    <>
      <main className="pb-20">{children}</main>

      <CompetitionNavbar gymSlug={gymSlug} competitionSlug={competitionSlug} />
    </>
  );
};

export default CompetitionLayout;

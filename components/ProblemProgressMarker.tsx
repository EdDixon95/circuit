import { problemColourClasses } from "@/Lib/problemColours";
import { ProblemStatus } from "@/Lib/progress";
import { CompetitionProblem } from "@prisma/client";

interface Props {
  status: ProblemStatus;
  size: 1 | 2 | 3 | 4;
  problem: CompetitionProblem;
}

const sizeClasses = {
  1: "h-4 w-4 border-2",
  2: "h-6 w-6 border-4",
  3: "h-8 w-8 border-6",
  4: "h-12 w-12 border-6",
} as const;

const ProblemProgressMarker = ({ status, size, problem }: Props) => {
  const colourClasses = problemColourClasses[problem.colour ?? "GREEN"];

  const statusClass =
    status === "COMPLETED"
      ? colourClasses.completed
      : status === "ATTEMPTED"
        ? colourClasses.attempted
        : colourClasses.unattempted;

  return (
    <div
      className={`rounded-full shrink-0  ${sizeClasses[size]} ${statusClass}`}
    />
  );
};

export default ProblemProgressMarker;

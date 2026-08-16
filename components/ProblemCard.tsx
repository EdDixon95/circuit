import { ProblemStatus } from "@/Lib/progress";
import { CompetitionProblem, Status } from "@prisma/client";
import ProblemProgressMarker from "./ProblemProgressMarker";

interface Props {
  problem: CompetitionProblem;
  status: ProblemStatus;
}

const ProblemCard = ({ problem, status }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 h-22 flex flex-col items-center p-2 justify-around">
      <span className="text-l font-semibold">{problem.problemNumber}</span>
      <ProblemProgressMarker status={status} size={2} problem={problem} />
      <span className="text-xs text-gray-600">{problem.grade}</span>
    </div>
  );
};

export default ProblemCard;

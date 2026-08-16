import { ProblemStatus } from "@/Lib/progress";
import { CompetitionProblem } from "@prisma/client";
import ProblemCard from "./ProblemCard";
import ProblemProgressMarker from "./ProblemProgressMarker";

interface Props {
  problemStatuses: {
    problem: CompetitionProblem;
    status: ProblemStatus;
  }[];
}

const CompetitionProblemsCard = ({ problemStatuses }: Props) => {
  console.log(problemStatuses);
  return (
    <div className="card flex flex-col ">
      <div className="flex flex-row justify-between items-center">
        <h2 className="font-semibold text-xl">Problems</h2>
        <span className="text-sm text-green-700">View All</span>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-5 pt-2">
        {problemStatuses.slice(0, 10).map(({ problem, status }) => (
          <ProblemCard key={problem.id} problem={problem} status={status} />
        ))}
      </div>
      <div className="flex flex-1 items-center mt-5">
        <div className="flex w-full justify-around">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full shrink-0 border-2 border-green-600 bg-green-600" />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full shrink-0 border-2 border-green-600 bg-green-600/30" />
            <p className="text-sm text-gray-600">Attempted</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full shrink-0 border-2 border-green-600 bg-transparent" />
            <p className="text-sm text-gray-600">Not Tried</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionProblemsCard;

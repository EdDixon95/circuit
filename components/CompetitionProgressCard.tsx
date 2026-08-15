import { CompetitionEntryWithAttempts } from "@/types/competition";
import CircularProgressBar from "./CircularProgressBar";
import ProblemProgressMarker from "./ProblemProgressMarker";
import { CompetitionProblem } from "@prisma/client";
import { ProblemStatus } from "@/Lib/progress";

interface Props {
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  attemptedProblems: number;
  problemStatuses: {
    problem: CompetitionProblem;
    status: ProblemStatus;
  }[];
}

const CompetitionProgressCard = ({
  progress,
  attemptedProblems,
  problemStatuses,
}: Props) => {
  console.log(progress);
  return (
    <div className="mt-4 m-auto border border-gray-100 rounded-2xl p-5 shadow flex flex-row">
      <div className="mr-4 shrink-0">
        <CircularProgressBar progress={progress} />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="font-bold">Your Progress</h2>
        <p>
          {attemptedProblems} of {progress.total} problems attempted
        </p>
        <div className="mt-3 overflow-x-auto pb-2">
          <div className="flex gap-3 w-max">
            {problemStatuses.map(({ problem, status }) => (
              <ProblemProgressMarker
                key={problem.id}
                problemNumber={problem.problemNumber}
                status={status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionProgressCard;

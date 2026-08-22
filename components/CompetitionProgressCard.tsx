import { CompetitionEntryWithAttempts } from "@/types/competition";
import CircularProgressBar from "./CircularProgressBar";
import ProblemProgressMarker from "./ProblemProgressMarker";
import { CompetitionProblem } from "@prisma/client";
import { ProblemStatus } from "@/Lib/progress";
import { calculateScore } from "@/Lib/leaderboard";

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
  score: number;
}

const CompetitionProgressCard = ({
  progress,
  attemptedProblems,
  problemStatuses,
  score,
}: Props) => {
  console.log(progress);
  return (
    <div className="mt-4 m-auto border card flex flex-row">
      <div className="mr-4 shrink-0">
        <CircularProgressBar progress={progress} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between">
          <h2 className="font-bold">Your Progress</h2>
          <p className="font-bold text-green-600">{score} Points</p>
        </div>
        <p>
          {attemptedProblems} of {progress.total} problems attempted
        </p>
        <div className="mt-3 overflow-x-auto pb-2">
          <div className="flex gap-3 w-max">
            {problemStatuses.map(({ problem, status }) => (
              <div
                className="flex shrink-0 flex-col items-center gap-1 "
                key={problem.id}
              >
                <ProblemProgressMarker
                  problem={problem}
                  status={status}
                  size={1}
                />
                <span className="text-xs text-gray-600">
                  {problem.problemNumber}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionProgressCard;

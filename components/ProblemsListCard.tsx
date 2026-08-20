"use client";

import { ProblemStatus } from "@/Lib/progress";
import { CompetitionProblem, Result } from "@prisma/client";
import ProblemProgressMarker from "./ProblemProgressMarker";
import ProblemStatusTag from "./ProblemStatusTag";
import { Check, RotateCcw, X } from "lucide-react";
import { logAttempt, resetProblemAttempts } from "@/app/actions/attempts";
import { useRouter } from "next/navigation";
import { error } from "console";

interface Props {
  problem: CompetitionProblem;
  status: ProblemStatus;
  attemptCount: number;
}

const ProblemsListCard = ({ problem, status, attemptCount }: Props) => {
  const router = useRouter();

  const handleAttempt = async (result: Result) => {
    try {
      await logAttempt(problem.id, result);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetAttempt = async () => {
    try {
      await resetProblemAttempts(problem.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4 ">
        <ProblemProgressMarker status={status} problem={problem} size={4} />
        <div>
          <h2 className="font-extrabold text-xl pb-2">
            Problem {problem.problemNumber}
          </h2>
          <ProblemStatusTag status={status} />
          <div className="pt-2">
            {attemptCount === 0
              ? "  "
              : attemptCount === 1
                ? "1 Attempt"
                : `${attemptCount} Attempts`}
          </div>
        </div>
      </div>
      <div className="items-center gap-2 flex flex-col">
        <div className="flex gap-3">
          {status !== "COMPLETED" && (
            <>
              <button
                className="rounded-full bg-green-300  p-3"
                onClick={() => handleAttempt(Result.TOP)}
              >
                <Check />
              </button>

              <button
                className="rounded-full bg-red-300  p-3"
                onClick={() => handleAttempt(Result.FAIL)}
              >
                <X />
              </button>
            </>
          )}
          {status !== "UNATTEMPTED" && (
            <button
              className="rounded-full bg-blue-300 p-3"
              onClick={() => handleResetAttempt()}
            >
              <RotateCcw />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemsListCard;

"use client";

import { useState } from "react";
import { ProblemStatus } from "@/Lib/progress";
import { CompetitionProblem } from "@prisma/client";
import ProblemsListCard from "./ProblemsListCard";

type Filter = "ALL" | "COMPLETED" | "ATTEMPTED" | "UNATTEMPTED";

interface Props {
  problemStatuses: {
    problem: CompetitionProblem;
    status: ProblemStatus;
    attemptCount: number;
  }[];
}

const ProblemsList = ({ problemStatuses }: Props) => {
  const [filter, setFilter] = useState<Filter>("ALL");

  const filteredProblems =
    filter === "ALL"
      ? problemStatuses
      : problemStatuses.filter(({ status }) => status === filter);
  return (
    <div>
      <div className="flex gap-2 justify-between mb-3">
        <button
          className={`toggleButton ${filter === "ALL" && "bg-blue-950 text-white"}`}
          onClick={() => setFilter("ALL")}
        >
          All
        </button>
        <button
          className={`toggleButton ${filter === "COMPLETED" && "bg-blue-950 text-white"}`}
          onClick={() => setFilter("COMPLETED")}
        >
          Completed
        </button>
        <button
          className={`toggleButton ${filter === "ATTEMPTED" && "bg-blue-950 text-white"}`}
          onClick={() => setFilter("ATTEMPTED")}
        >
          Attempted
        </button>
        <button
          className={`toggleButton ${filter === "UNATTEMPTED" && "bg-blue-950 text-white"}`}
          onClick={() => setFilter("UNATTEMPTED")}
        >
          Not Tried
        </button>
      </div>
      {filteredProblems.map(({ problem, status, attemptCount }) => (
        <ProblemsListCard
          problem={problem}
          status={status}
          attemptCount={attemptCount}
          key={problem.id}
        />
      ))}
    </div>
  );
};

export default ProblemsList;

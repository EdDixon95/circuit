import { ProblemStatus } from "@/Lib/progress";
import { Ban, Circle, CircleCheckBig } from "lucide-react";
import React from "react";

interface Props {
  status: ProblemStatus;
}

const ProblemStatusTag = ({ status }: Props) => {
  return (
    <div
      className={`${status === "COMPLETED" ? "bg-green-100 text-green-900" : status === "ATTEMPTED" ? "bg-blue-100 text-blue-900" : "bg-gray-200 text-gray-900"} rounded-xl font-medium text-s py-1 inline-flex w-fit gap-1 shrink-0 whitespace-nowrap px-3 items-center`}
    >
      {status === "COMPLETED" ? (
        <>
          <CircleCheckBig width={20} height={20} />
          Completed
        </>
      ) : status === "ATTEMPTED" ? (
        <>
          <Ban width={20} height={20} />
          Attempted
        </>
      ) : (
        <>
          <Circle width={20} height={20} />
          Not Tried
        </>
      )}
    </div>
  );
};

export default ProblemStatusTag;

import { ProblemStatus } from "@/Lib/progress";
import { Ban, CircleCheckBig, CircleEllipsisIcon } from "lucide-react";

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
          <CircleEllipsisIcon width={20} height={20} />
          Attempted
        </>
      ) : (
        <>
          <Ban width={20} height={20} />
          Not Tried
        </>
      )}
    </div>
  );
};

export default ProblemStatusTag;

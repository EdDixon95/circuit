import { ProblemStatus } from "@/Lib/progress";

interface Props {
  problemNumber: number;
  status: ProblemStatus;
}

const ProblemProgressMarker = ({ problemNumber, status }: Props) => {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1 ">
      <div
        className={`h-3 w-3 rounded-full border-2 ${
          status === "COMPLETED"
            ? "border-green-600 bg-green-600"
            : status === "ATTEMPTED"
              ? "border-green-600 bg-white"
              : "border-gray-300 bg-white"
        }`}
      />

      <span className="text-xs text-gray-600">{problemNumber}</span>
    </div>
  );
};

export default ProblemProgressMarker;

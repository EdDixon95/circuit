interface Props {
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
}

const CircularProgressBar = ({ progress }: Props) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress.percentage / 100) * circumference;
  return (
    <div className="relative h-25 w-25">
      <svg className="h-full w-full  -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-200"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className="text-green-600"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{progress.completed}</span>

        <span className="text-xs text-gray-500">/ {progress.total}</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;

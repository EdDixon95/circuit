import { Leaderboard } from "@/types/competition";

interface Props {
  leaderboard: Leaderboard;
}

const LeaderboardPreviewCard = ({ leaderboard }: Props) => {
  return (
    <div className="w-[85%] shrink-0 snap-center rounded-2xl border border-gray-100 bg-white p-5 shadow">
      <div className="flex justify-between items-baseline">
        <h3 className="mb-4 text-lg font-semibold">
          {leaderboard.category.name}
        </h3>
        <h3 className="mb-4 text-lg text-green-600">View full</h3>
      </div>

      <div className="space-y-3">
        {leaderboard.entries.slice(0, 3).map((entry, index) => (
          <div
            key={entry.user.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {
                <span
                  className={`w-5 ${index == 0 ? "font-bold text-lg text-green-600" : "font-medium"}`}
                >
                  {index + 1}
                </span>
              }

              <span
                className={`${index == 0 ? "font-bold text-lg text-green-600" : "font-medium"}`}
              >
                {entry.user.firstName} {entry.user.lastName}
              </span>
            </div>

            <span
              className={`${index == 0 ? "font-bold text-lg text-green-600" : "font-semibold"}`}
            >
              {entry.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPreviewCard;

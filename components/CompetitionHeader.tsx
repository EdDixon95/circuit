import Image from "next/image";

import { CompetitionWithGym } from "@/types/competition";
import { Calendar, Mountain, Users } from "lucide-react";

interface Props {
  competition: CompetitionWithGym;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(date);
};

const CompetitionHeader = ({ competition }: Props) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center gap-4 sm:gap-8">
        {competition?.gym.logoUrl && (
          <div className="flex h-25 w-25 shrink-0 items-center justify-center rounded-full bg-white shadow-md mr-2 mb-1">
            <Image
              src={competition?.gym.logoUrl ?? ""}
              alt={competition?.gym.name || "Gym Logo"}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
            ONGOING
          </span>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {competition?.name}
          </h1>

          <p className="text-l text-gray-900">{competition?.gym.name}</p>
        </div>
      </div>

      {/* Details */}
      <div className="my-3 grid grid-cols-3 items-center">
        <div className="flex min-w-0 items-center justify-center gap-2 border-r border-gray-200 px-2">
          <Calendar className="h-6 w-6 shrink-0" />
          <span className="text-center text-sm sm:text-base">
            <span>
              {formatDate(competition.startDate)} -{" "}
              {formatDate(competition.endDate)}
            </span>
          </span>
        </div>

        <div className="flex min-w-0 items-center justify-center gap-2 border-r border-gray-200 px-2">
          <Users className="h-6 w-6 shrink-0" />
          <span className="text-center text-sm sm:text-base">
            {competition?._count.entries} entries
          </span>
        </div>

        <div className="flex min-w-0 items-center justify-center gap-2 px-2">
          <Mountain className="h-6 w-6 shrink-0" />
          <span className="text-center text-sm sm:text-base">
            {competition?._count.problems} Problems
          </span>
        </div>
      </div>

      {/* Button */}
    </div>
  );
};

export default CompetitionHeader;

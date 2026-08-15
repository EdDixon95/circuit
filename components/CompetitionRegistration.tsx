"use client";

import { registerForCompetition } from "@/app/actions/competition";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { refresh } from "next/cache";

interface Props {
  competitionId: string;
  categories: {
    id: string;
    name: string;
  }[];
}

const CompetitionRegistration = ({ categories, competitionId }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <button
        className="mt-6 w-full rounded-xl bg-green-600 py-3.5 text-lg font-semibold text-white transition hover:bg-green-700"
        onClick={() => {
          setOpen(true);
        }}
      >
        Enter Competition
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl">
            <h2 className="font-semibold text-xl">Enter Competition</h2>
            <p>Choose your category to enter.</p>
            <div>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                  }}
                  className={`inline-block rounded-lg  text-sm font-semibold px-3 py-2 mt-4 mx-2 ${category.id === selectedCategory ? "bg-green-600 text-white" : "bg-green-100 text-green-700"}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <button
              onClick={async () => {
                if (!selectedCategory) {
                  return;
                }

                await registerForCompetition(
                  competitionId,
                  selectedCategory,
                  pathname,
                );
                setOpen(false);
                router.refresh();
              }}
              disabled={!selectedCategory}
              className="disabled:opacity-40 mt-6 w-full rounded-xl bg-green-600 py-3.5 text-lg font-semibold text-white transition hover:bg-green-700"
            >
              Confirm Entry
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompetitionRegistration;

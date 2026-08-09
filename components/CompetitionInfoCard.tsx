import React from "react";

const CategoryItem = ({ category }: { category: any }) => {
  return (
    <div className="inline-block rounded-lg bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
      {category.name.toUpperCase()}
    </div>
  );
};

const CompetitionInfoCard = ({ competition }: { competition: any }) => {
  return (
    <div>
      <div className="mt-6 rounded-xl bg-white p-6 border border-gray-100 ">
        <h2 className="text-lg font-semibold text-gray-900">
          Competition Details
        </h2>
        <p className="mt-3 text-gray-700">{competition.description}</p>
      </div>
      <div className="mt-3 rounded-xl bg-white p-6 border border-gray-100 ">
        <h2 className="text-lg font-semibold text-gray-900">
          Competition Categories
        </h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {competition.categories?.map((category: any) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionInfoCard;

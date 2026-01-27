import React from "react";
import { GiCookingPot, GiKnifeFork, GiMagnifyingGlass } from "react-icons/gi";

const features = [
  {
    icon: <GiCookingPot className="text-primary text-4xl" />,
    title: "Personalized Recipes",
    description: "Get recipe recommendations based on your favorite cuisines and previous ratings.",
  },
  {
    icon: <GiKnifeFork className="text-primary text-4xl" />,
    title: "Meal Planner & Cooking Tracker",
    description: "Plan your meals weekly and track your cooking status: Planned, Cooking, Cooked.",
  },
  {
    icon: <GiMagnifyingGlass className="text-primary text-4xl" />,
    title: "Recipe Discovery & Search",
    description: "Browse recipes, search by ingredients or name, filter by category or cuisine.",
  },
];

const Features = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-4xl font-bold text-primary mb-12">Features / Highlights</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-accent mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

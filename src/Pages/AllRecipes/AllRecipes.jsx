import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";

const AllRecipes = () => {
  const [recipes] = useState([
    {
      _id: "1",
      title: "Butter Chicken",
      category: "Dinner",
      cuisine: "Indian",
      ingredients: ["Chicken", "Butter", "Tomato", "Spices"],
      instructions: "Cook chicken with spices and butter.",
      calories: 450,
      cookingTime: "40 mins",
      image: "https://www.recipetineats.com/tachyon/2019/01/Butter-Chicken_5-SQ.jpg",
    },
    {
      _id: "2",
      title: "Pasta Alfredo",
      category: "Lunch",
      cuisine: "Italian",
      ingredients: ["Pasta", "Cream", "Cheese"],
      instructions: "Boil pasta and mix with creamy sauce.",
      calories: 380,
      cookingTime: "25 mins",
      image: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
    },
    {
      _id: "3",
      title: "Vegetable Omelette",
      category: "Breakfast",
      cuisine: "Continental",
      ingredients: ["Eggs", "Onion", "Capsicum"],
      instructions: "Whisk eggs and cook with vegetables.",
      calories: 250,
      cookingTime: "15 mins",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    },
  ]);

  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);

  const handleSave = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">
            All Recipes
          </h1>
          <p className="text-accent text-lg">
            Browse and search recipes easily
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by recipe or cuisine..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="card bg-white shadow-md hover:shadow-xl transition"
            >
              <figure className="h-52 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-primary">{recipe.title}</h2>

                <div className="flex gap-2 flex-wrap text-sm">
                  <span className="badge badge-secondary text-white">{recipe.category}</span>
                  <span className="badge badge-outline">{recipe.cuisine}</span>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  ⏱ {recipe.cookingTime} | {recipe.calories} kcal
                </p>

                <div className="card-actions justify-between mt-4">
                  <button
                    onClick={() => handleSave(recipe._id)}
                    className="btn btn-ghost btn-sm flex items-center gap-1"
                  >
                    {saved.includes(recipe._id) ? (
                      <FaHeart className="text-secondary text-lg" />
                    ) : (
                      <FaRegHeart className="text-lg" />
                    )}
                    Save
                  </button>

                  <Link
                    to={`/recipes/${recipe._id}`}
                    className="btn btn-primary btn-sm text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <p className="text-center text-gray-500 mt-16">
            No recipes found
          </p>
        )}
      </div>
    </section>
  );
};

export default AllRecipes;

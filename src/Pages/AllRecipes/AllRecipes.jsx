import React, { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const AllRecipes = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);


  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recipes");
      return res.data;
    },
  });

  const handleSave = async (recipeId) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login required",
        text: "Please log in to save recipes",
      });
      return;
    }

    try {
      const res = await axiosSecure.post("/saved-recipes", { recipeId });

      if (res.data._id) {
        setSaved((prev) => [...prev, recipeId]);

        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Recipe saved to your Cookbook",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Swal.fire("Already Saved", "This recipe is already in your Cookbook", "info");
      } else {
        Swal.fire("Error", "Please try again", "error");
      }
    }
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

        {isLoading ? (
          <p className="text-center text-gray-500 mt-16">
            Loading recipes...
          </p>
        ) : (
          <>
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
                    <h2 className="card-title text-primary">
                      {recipe.title}
                    </h2>

                    <div className="flex gap-2 flex-wrap text-sm">
                      <span className="badge badge-secondary text-white">
                        {recipe.category}
                      </span>
                      <span className="badge badge-outline">
                        {recipe.cuisine}
                      </span>
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
          </>
        )}
      </div>
    </section>
  );
};

export default AllRecipes;

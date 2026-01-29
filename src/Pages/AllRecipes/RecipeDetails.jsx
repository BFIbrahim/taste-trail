import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import { useParams } from "react-router";

const RecipeDetails = () => {
  const { id } = useParams(); // recipeId from URL
  const axiosSecure = useAxiosSecure();

  // Fetch recipe details
  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/recipes/${id}`);
      return res.data;
    },
    enabled: !!id, // only fetch if id exists
  });

  if (isLoading) return <Loading />;

  if (!recipe) return <p className="text-center mt-10">Recipe not found.</p>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Recipe Title */}
        <h1 className="text-4xl font-bold text-primary mb-6">{recipe.title}</h1>

        {/* Recipe Info */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={recipe.image || "/default-recipe.jpg"}
              alt={recipe.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 space-y-4">
            <p>
              <span className="font-semibold">Category:</span> {recipe.category}
            </p>
            <p>
              <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
            </p>
            <p>
              <span className="font-semibold">Calories:</span> {recipe.calories} kcal
            </p>
            <p>
              <span className="font-semibold">Cooking Time:</span> {recipe.cookingTime}
            </p>

            <div>
              <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
              <p>{recipe.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetails;

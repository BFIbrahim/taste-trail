import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RxCross1 } from "react-icons/rx";

const ManageRecipe = () => {
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { data: recipes = [], isLoading: recipesLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recipes");
      return res.data;
    },
  });

  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/recipes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      Swal.fire("Deleted!", "Recipe has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete recipe", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This recipe will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const assignCategoryMutation = useMutation({
    mutationFn: ({ recipeId, category }) =>
      axiosInstance.patch(`/recipes/${recipeId}/assign-category`, { category }),
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      Swal.fire("Updated!", "Category assigned successfully", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign category", "error");
    },
  });

  const handleAssignCategory = (recipeId, category) => {
    assignCategoryMutation.mutate({ recipeId, category });
  };

  const updateRecipeMutation = useMutation({
    mutationFn: (updatedRecipe) =>
      axiosInstance.patch(`/recipes/${updatedRecipe._id}`, updatedRecipe),
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      Swal.fire("Updated!", "Recipe updated successfully", "success");
      setIsModalOpen(false);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update recipe", "error");
    },
  });

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    updateRecipeMutation.mutate(selectedRecipe);
  };

  if (recipesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-primary border-b-primary border-l-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Manage Recipes</h1>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Cuisine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td className="flex items-center gap-3">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  {recipe.title}
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={recipe.category}
                    disabled={catLoading}
                    onChange={(e) =>
                      handleAssignCategory(recipe._id, e.target.value)
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{recipe.cuisine}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(recipe)}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="border rounded-xl p-4 bg-white shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium">{recipe.title}</h3>
                <p className="text-sm text-gray-500">{recipe.category}</p>
                <p className="text-sm text-gray-500">{recipe.cuisine}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <select
                className="select select-bordered w-full"
                value={recipe.category}
                disabled={catLoading}
                onChange={(e) =>
                  handleAssignCategory(recipe._id, e.target.value)
                }
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditClick(recipe)}
                  className="btn btn-sm btn-warning flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="btn btn-sm btn-error flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRecipe && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              <RxCross1 className="text-xl" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>

            <div className="flex flex-col gap-4">

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Title"
                value={selectedRecipe.title}
                onChange={(e) =>
                  setSelectedRecipe({ ...selectedRecipe, title: e.target.value })
                }
              />

              <select
                className="select select-bordered w-full"
                value={selectedRecipe.category}
                onChange={(e) =>
                  setSelectedRecipe({ ...selectedRecipe, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Cuisine"
                value={selectedRecipe.cuisine}
                onChange={(e) =>
                  setSelectedRecipe({ ...selectedRecipe, cuisine: e.target.value })
                }
              />

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Ingredients (comma separated)"
                value={selectedRecipe.ingredients.join(", ")}
                onChange={(e) =>
                  setSelectedRecipe({
                    ...selectedRecipe,
                    ingredients: e.target.value.split(",").map((i) => i.trim()),
                  })
                }
              />

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Instructions"
                value={selectedRecipe.instructions}
                onChange={(e) =>
                  setSelectedRecipe({
                    ...selectedRecipe,
                    instructions: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Calories"
                value={selectedRecipe.calories || ""}
                onChange={(e) =>
                  setSelectedRecipe({
                    ...selectedRecipe,
                    calories: Number(e.target.value),
                  })
                }
              />

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Cooking Time (e.g., 30 mins)"
                value={selectedRecipe.cookingTime || ""}
                onChange={(e) =>
                  setSelectedRecipe({
                    ...selectedRecipe,
                    cookingTime: e.target.value,
                  })
                }
              />

              <button onClick={handleSave} className="btn btn-primary mt-2">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageRecipe;

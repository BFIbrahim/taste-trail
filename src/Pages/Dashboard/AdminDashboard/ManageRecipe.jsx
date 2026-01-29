import React, { } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import { Link } from "react-router";

const ManageRecipe = () => {
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

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

  if (recipesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-primary border-b-primary border-l-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Manage Recipes
      </h1>

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
                  <Link
                    to={`/dashboard/edit-recipe/${recipe._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
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
                <Link
                  to={`/dashboard/edit-recipe/${recipe._id}`}
                  className="btn btn-sm btn-warning flex-1"
                >
                  Edit
                </Link>
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
    </div>
  );
};

export default ManageRecipe;

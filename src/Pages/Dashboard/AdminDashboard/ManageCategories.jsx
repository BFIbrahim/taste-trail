import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageCategories = () => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });

  const addCategory = useMutation({
    mutationFn: async (newCategory) => {
      return axiosSecure.post("/categories", newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setName("");
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory.mutate({ name });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <p className="text-sm text-gray-500">
          Add, view and delete food categories
        </p>
      </div>

      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-3 max-w-md"
      >
        <input
          type="text"
          placeholder="Category name (e.g. Dessert)"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary text-white">
          {addCategory.isLoading ? "Adding..." : "Add"}
        </button>
      </form>

      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="card bg-base-100 shadow-md border"
            >
              <div className="card-body flex-row items-center justify-between">
                <h2 className="font-semibold capitalize">
                  {cat.name}
                </h2>

                <button
                  onClick={() => deleteCategory.mutate(cat._id)}
                  className="btn btn-sm btn-error btn-outline"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCategories;

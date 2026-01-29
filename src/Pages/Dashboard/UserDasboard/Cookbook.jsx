import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

const Cookbook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: savedRecipes = [], isLoading } = useQuery({
    queryKey: ["cookbook", user?._id],
    queryFn: async () => {
      if (!user?._id) return [];
      const res = await axiosSecure.get(`/saved-recipes?userId=${user._id}`);
      return res.data;
    },
    enabled: !!user?._id,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This recipe will be removed from your cookbook.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/saved-recipes/${id}`);
          Swal.fire("Deleted!", "Recipe has been removed.", "success");
          queryClient.invalidateQueries(["cookbook", user?._id]);
        } catch (error) {
          Swal.fire("Error", "Failed to remove recipe.", "error");
          console.log(error)
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          My Cookbook
        </h1>

        {savedRecipes.length === 0 ? (
          <p className="text-center text-gray-500">
            No data found in your cookbook.
          </p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Cuisine</th>
                    <th>Calories</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {savedRecipes.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.recipeId?.title}</td>
                      <td>{item.recipeId?.category}</td>
                      <td>{item.recipeId?.cuisine}</td>
                      <td>{item.recipeId?.calories} kcal</td>
                      <td>{item.recipeId?.cookingTime}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-error btn-sm text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-6 md:hidden">
              {savedRecipes.map((item) => (
                <div key={item._id} className="card bg-white shadow-md">
                  <figure className="h-40 overflow-hidden">
                    <img
                      src={item.recipeId?.image}
                      alt={item.recipeId?.title}
                      className="h-full w-full object-cover"
                    />
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title text-primary">
                      {item.recipeId?.title}
                    </h2>

                    <div className="flex gap-2 flex-wrap text-sm">
                      <span className="badge badge-secondary text-white">
                        {item.recipeId?.category}
                      </span>
                      <span className="badge badge-outline">
                        {item.recipeId?.cuisine}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      ⏱ {item.recipeId?.cookingTime} | {item.recipeId?.calories} kcal
                    </p>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-error btn-sm text-white mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cookbook;

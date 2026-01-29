import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";

const statusOptions = ["Planned", "Cooking", "Cooked"];

const TrackCooking = () => {
  const { user } = useContext(AuthContext);
  console.log(user)
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: mealPlans = [], isLoading } = useQuery({
    queryKey: ["mealPlans", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/meal-plans?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosInstance.patch(`/meal-plans/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealPlans", user?.email] });
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status", "error");
    },
  });

  const handleStatusChange = (id, status) => {
    mutation.mutate({ id, status });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-primary border-b-primary border-l-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">
        My Cooking Tracker
      </h1>

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Day</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mealPlans.map((plan) => (
              <tr key={plan._id}>
                <td className="flex items-center gap-3">
                  <img
                    src={plan.recipe?.image}
                    alt={plan.recipe?.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  {plan.recipe?.title}
                </td>
                <td>{plan.dayOfWeek}</td>
                <td>{new Date(plan.date).toLocaleDateString()}</td>
                <td>
                  <select
                    value={plan.status}
                    onChange={(e) =>
                      handleStatusChange(plan._id, e.target.value)
                    }
                    className="select select-bordered select-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {mealPlans.map((plan) => (
          <div
            key={plan._id}
            className="border rounded-xl p-4 bg-white shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={plan.recipe?.image}
                alt={plan.recipe?.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium">{plan.recipe?.title}</h3>
                <p className="text-sm text-gray-500">{plan.dayOfWeek}</p>
                <p className="text-sm text-gray-500">
                  {new Date(plan.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={plan.status}
                onChange={(e) =>
                  handleStatusChange(plan._id, e.target.value)
                }
                className="select select-bordered w-full"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackCooking;

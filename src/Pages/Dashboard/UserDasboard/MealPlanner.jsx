import React, { useContext, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MealPlanner = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [planner, setPlanner] = useState({});
  const [activeDay, setActiveDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  /* =======================
     FETCH RECIPES FROM API
  ======================== */
  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recipes");
      return res.data;
    },
  });

  const openModal = (day) => {
    setActiveDay(day);
    setShowModal(true);
  };

  const addRecipe = (recipe) => {
    setPlanner((prev) => ({
      ...prev,
      [activeDay]: {
        ...recipe,
        status: "Planned",
      },
    }));
    setShowModal(false);
    setSearch("");
  };

  const removeRecipe = (day) => {
    const copy = { ...planner };
    delete copy[day];
    setPlanner(copy);
  };

  const handleSaveWeek = async () => {
    if (Object.keys(planner).length === 0) {
      return Swal.fire("Nothing to save", "Add at least one recipe", "info");
    }

    const payload = Object.keys(planner).map((day) => ({
      userId: user._id,
      recipeId: planner[day]._id,
      date: new Date(),
      dayOfWeek: day,
      email: user.email,
      status: planner[day].status || "Planned",
    }));

    try {
      await axiosSecure.post("/meal-plans", payload);
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Your weekly meal plan has been saved.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to save meal plan", "error");
      console.log(error);
    }
    
  };

  const handleClearWeek = () => {
    Swal.fire({
      title: "Clear weekly plan?",
      text: "This will remove all planned meals",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, clear it",
    }).then((result) => {
      if (result.isConfirmed) {
        setPlanner({});
        Swal.fire("Cleared!", "Weekly plan is empty now.", "success");
      }
    });
  };

  /* =======================
     CLEAN FILTER LOGIC
  ======================== */
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">
          My Weekly Meal Plan
        </h1>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button onClick={handleClearWeek} className="btn btn-outline btn-sm">
            Clear Week
          </button>
          <button
            onClick={handleSaveWeek}
            className="btn btn-primary btn-sm text-white"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className="border rounded-xl p-3 bg-white min-h-[180px]">
            <h3 className="font-semibold mb-3 text-primary">{day}</h3>

            {!planner[day] && (
              <button
                onClick={() => openModal(day)}
                className="border-2 border-dashed rounded-lg w-full h-28 flex flex-col items-center justify-center text-accent hover:border-primary"
              >
                <FaPlus className="mb-1" />
                <span>Add Recipe</span>
              </button>
            )}

            {planner[day] && (
              <div className="relative bg-gray-50 rounded-lg p-2">
                <button
                  onClick={() => removeRecipe(day)}
                  className="absolute top-1 right-1 text-gray-400 hover:text-red-500"
                >
                  <FaTimes />
                </button>

                <img
                  src={planner[day].image}
                  alt={planner[day].title}
                  className="w-full h-20 object-cover rounded-md mb-2"
                />

                <h4 className="text-sm font-medium">{planner[day].title}</h4>

                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-secondary text-black">
                  {planner[day].status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-5">
            <h3 className="text-xl font-semibold mb-4">
              Add Recipe to {activeDay}
            </h3>

            <input
              type="text"
              placeholder="Search recipes..."
              className="input input-bordered w-full mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {isLoading ? (
                <p className="text-center text-gray-500">Loading recipes...</p>
              ) : (
                filteredRecipes.map((recipe) => (
                  <button
                    key={recipe._id}
                    onClick={() => addRecipe(recipe)}
                    className="flex items-center gap-3 w-full p-2 border rounded-lg hover:bg-gray-100"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <span className="font-medium">{recipe.title}</span>
                  </button>
                ))
              )}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="btn btn-sm btn-outline mt-4 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;

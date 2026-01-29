import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

// Recharts imports
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Overview = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch user's meal plans
  const { data: mealPlans = [], isLoading } = useQuery({
    queryKey: ["mealPlans", user?._id],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/meal-plans?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  // Prepare Pie chart data for status
  const statusCount = mealPlans.reduce((acc, plan) => {
    acc[plan.status] = (acc[plan.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: "Planned", value: statusCount.Planned || 0 },
    { name: "Cooking", value: statusCount.Cooking || 0 },
    { name: "Cooked", value: statusCount.Cooked || 0 },
  ];

  // Prepare Bar chart data for day of week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const barData = days.map(day => {
    const count = mealPlans.filter(plan => plan.dayOfWeek === day).length;
    return { day, count };
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          My Meal Overview
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Pie Chart for status */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Meal Status</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Bar Chart for meals per day */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Meals per Day</h2>
            <BarChart width={500} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;

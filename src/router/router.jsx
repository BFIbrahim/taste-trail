import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllRecipes from "../Pages/AllRecipes/AllRecipes";
import Login from "../Pages/Authentication/Login";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Authentication/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import MealPlanner from "../Pages/Dashboard/UserDasboard/MealPlanner";
import PrivetRoute from "../routes/PrivetRoute";
import TrackCooking from "../Pages/Dashboard/UserDasboard/TrackCooking";
import ManageCategories from "../Pages/Dashboard/AdminDashboard/ManageCategories";
import AddNewRecipe from "../Pages/Dashboard/AdminDashboard/AddNewRecipe";
import ManageRecipe from "../Pages/Dashboard/AdminDashboard/ManageRecipe";
import Cookbook from "../Pages/Dashboard/UserDasboard/CookBook";
import RecipeDetails from "../Pages/AllRecipes/RecipeDetails";
import Overview from "../Pages/Dashboard/UserDasboard/Overview";
import DashboardRedirect from "../Components/DashboardRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'recipes',
        element: <PrivetRoute><AllRecipes /></PrivetRoute>
      },
      {
        path: 'recipes/:id',
        element: <PrivetRoute><RecipeDetails /></PrivetRoute>
      }
    ]
  },

  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },

  {
    path: 'dashboard',
    element: <PrivetRoute><DashboardLayout /></PrivetRoute>,
    children: [
      {
        index: true,
        element: <DashboardRedirect />
      },
      {
        path: "mealplanner",
        element: <MealPlanner />
      },
      {
        path: "track-cooking",
        element: <TrackCooking />
      },
      {
        path: "manage-categories",
        element: <ManageCategories />
      },
      {
        path: "add-new-recipe",
        element: <AddNewRecipe />
      },
      {
        path: 'manage-recipes',
        element: <ManageRecipe />
      },
      {
        path: 'personal-cookbook',
        element: <Cookbook />
      },
      {
        path: 'overview',
        element: <Overview />
      }
    ]
  }
]);
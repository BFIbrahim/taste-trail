import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllRecipes from "../Pages/AllRecipes/AllRecipes";
import Login from "../Pages/Authentication/Login";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Authentication/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import MealPlanner from "../Pages/Dashboard/UserDasboard/MealPlanner";
import CookingTracker from "../Pages/Dashboard/UserDasboard/CookingTracker";

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
          element: <AllRecipes />
        }
    ]
  },

  {
    path: 'auth',
    element: <AuthLayout />,
    children:[
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
    element: <DashboardLayout />,
    children: [
      {
        path: "mealplanner",
        element: <MealPlanner />
      },
      {
        path: "track-cooking",
        element: <CookingTracker />
      }
    ]
  }
]);
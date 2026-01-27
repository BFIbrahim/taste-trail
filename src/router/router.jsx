import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllRecipes from "../Pages/AllRecipes/AllRecipes";

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
]);
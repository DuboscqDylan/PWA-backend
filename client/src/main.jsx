import ReactDOM from "react-dom/client";
import "./i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Favorites } from "./pages/Favorites/Favorites";
import { About } from "./pages/About/About";
import { Home } from "./pages/Home/Home";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { Details } from "./pages/Details/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "Favorites", element: <Favorites /> },
      { path: "About", element: <About /> },
      { path: "songs/:id", element: <Details /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <FavoritesProvider>
    <RouterProvider router={router} />
  </FavoritesProvider>,
);

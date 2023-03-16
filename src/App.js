import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Favourite from "./pages/favourite";
import PokemonDetail from "./pages/detail";
import Splash from "./pages/splash";

import "./App.css";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/favourite",
    element: <Favourite></Favourite>,
  },
  {
    path: "/detail/:id",
    element: <PokemonDetail></PokemonDetail>,
  },
]);

function App() {
  const [show, setShow] = useState(localStorage.getItem("show"));

  setTimeout(() => {
    if (!show) {
      localStorage.setItem("show", "true");
      setShow(true);
    }
  }, 2000);

  return (
    <>
      {show ? (
        <div className={"App"}>
          <RouterProvider router={router}></RouterProvider>
        </div>
      ) : (
        <Splash></Splash>
      )}
    </>
  );
}

export default App;

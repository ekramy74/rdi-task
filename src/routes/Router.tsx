import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loadable from "../components/loadable/Loadable";
import Navbar from "../components/navbar/Navbar";

/* ****Pages***** */
const Home = Loadable(lazy(() => import("../views/home/home")));
const PageNotFound = Loadable(
  lazy(() => import("../components/NotFound/pageNotFound"))
);

const Router = [
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <Navigate to='/Home' /> },
      { path: "/Home", exact: true, element: <Home /> },

      { path: "*", element: <PageNotFound /> },
    ],
  },
];

export default Router;

import { Suspense, lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.scss";
import "./styles/Global.scss";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import { CircularProgress } from "@mui/material";

const lazyImport = name => lazy(() => import("./pages/index").then((module) => ({ default: module[name] })));

const Launches = lazyImport("Launches");
const Products = lazyImport("Products");
const News = lazyImport("News");
const Community = lazyImport("Community");
const Advertise = lazyImport("Advertise");
const User = lazyImport("User");
const PageNotFound = lazyImport("PageNotFound");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="all" element={<Home />} />
        <Route path="/leaderboard" element={<Launches />}>
          <Route path="daily/:year/:month/:day" element={<Launches />}>
            <Route path="all" element={<Launches />} />
          </Route>
          <Route path="weekly/:year/:week" element={<Launches />}>
            <Route path="all" element={<Launches />} />
          </Route>
          <Route path="monthly/:year/:month" element={<Launches />}>
            <Route path="all" element={<Launches />} />
          </Route>
          <Route path="yearly/:year" element={<Launches />}>
            <Route path="all" element={<Launches />} />
          </Route>
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/news" element={<News />} />
        <Route path="/community" element={<Community />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/user" element={<User />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;

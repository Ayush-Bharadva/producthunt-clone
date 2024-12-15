import { Suspense, lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.scss";
import "./styles/Global.scss";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import Loader from "./components/common/loader/Loader";
import LaunchesWrapper from "./pages/launches/LaunchesWrapper";

const dynamicImport = name => lazy(() => import("./pages/index").then((module) => ({ default: module[name] })));

const Launches = dynamicImport("Launches");
const Products = dynamicImport("Products");
const News = dynamicImport("News");
const Community = dynamicImport("Community");
const Advertise = dynamicImport("Advertise");
const User = dynamicImport("User");
const PageNotFound = dynamicImport("PageNotFound");
const FeaturedProducts = dynamicImport("FeaturedProducts");
const AllProducts = dynamicImport("AllProducts");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Layout />}>
        <Route path="" element={<Home />} >
          <Route path="" element={<FeaturedProducts />} />
          <Route path="/all" element={<AllProducts />} />
        </Route>
        <Route path="/leaderboard" element={<LaunchesWrapper />}>
          <Route path="daily/:year/:month/:day" element={<Launches isFeatured={true} />} />

          <Route path="daily/:year/:month/:day/all" element={<Launches isFeatured={false} />} />

          <Route path="weekly/:year/:week" element={<Launches isFeatured={true} />} />

          <Route path="weekly/:year/:week/all" element={<Launches isFeatured={false} />} />

          <Route path="monthly/:year/:month" element={<Launches isFeatured={true} />} />

          <Route path="monthly/:year/:month/all" element={<Launches isFeatured={false} />} />

          <Route path="yearly/:year" element={<Launches isFeatured={true} />} />

          <Route path="yearly/:year/all" element={<Launches isFeatured={false} />} />
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

  window.ReactNativeWebView.postMessage("Hello from ProductHunt");

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </Suspense>
  );
}

export default App;

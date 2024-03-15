import { Suspense, lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./App.scss";
import "./styles/Global.scss";
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import PageNotFound from "./pages/not-found-page/PageNotFound";
// import Weekly from './components/Weekly';
// import Monthly from './components/Monthly';
// import Yearly from './components/Yearly';

const lazyImport = name =>
  lazy(() => import("./pages/index").then(module => ({ default: module[name] })));

const Launches = lazyImport("Launches");
const Products = lazyImport("Products");
const News = lazyImport("News");
const Community = lazyImport("Community");
const Advertise = lazyImport("Advertise");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home featured />}>
          <Route path="all" element={<Home featured={false} />} />
        </Route>
        <Route path="leaderboard" element={<Launches />}>
          <Route path="daily/:year/:month/:day" element={<Launches featured />}>
            <Route path="all" element={<Launches featured={false} />} />
          </Route>
          <Route path="weekly/:year/:week" element={<Launches featured />} >
            <Route path="all" element={<Launches featured={false} />} />
          </Route>
          <Route path="monthly/:year/:month" element={<Launches featured />} >
            <Route path="all" element={<Launches featured={false} />} />
          </Route>
          <Route path="yearly/:year" element={<Launches featured />} >
            <Route path="all" element={<Launches featured={false} />} />
          </Route>
        </Route>
        <Route path="products" element={<Products />} />
        <Route path="news" element={<News />} />
        <Route path="community" element={<Community />} />
        <Route path="advertise" element={<Advertise />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

function App() {
  return (
    <Suspense fallback={<p>loading..</p>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App

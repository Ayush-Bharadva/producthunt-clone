import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./App.scss";
import "./styles/Global.scss";
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Daily from './components/Daily';
import Weekly from './components/Weekly';
import Monthly from './components/Monthly';
import Yearly from './components/Yearly';
import { lazy } from "react";

const lazyImport = name =>
  lazy(() => import("./pages/index").then(module => ({ default: module[name] })));

const Launches = lazyImport("Launches");
const Products = lazyImport("Products");
const News = lazyImport("News");
const Community = lazyImport("Community");
const Advertise = lazyImport("Advertise");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />}>
        <Route path="all" element={<Home />} />
      </Route>
      <Route path="leaderboard" element={<Launches />}>
        <Route path="daily" element={<Daily />}>
          <Route path=":day" element={<Daily />} />
        </Route>
        <Route path="weekly" element={<Weekly />} />
        <Route path="monthly" element={<Monthly />} />
        <Route path="yearly" element={<Yearly />} />
      </Route>
      <Route path="products" element={<Products />} />
      <Route path="news" element={<News />} />
      <Route path="community" element={<Community />} />
      <Route path="advertise" element={<Advertise />} />
    </Route>
  )
);

function App() {
  return (
    <>
      {/* <h2>ProductHunt</h2> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App

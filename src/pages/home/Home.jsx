import "./Home.scss";
import TopLaunches from "../../components/home/top-launches/TopLaunches";
import FeaturedProducts from "./FeaturedProducts";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="homer-container">
        <FeaturedProducts />
        <Outlet />
      </div>
      <TopLaunches />
    </>
  );
};

export default Home;

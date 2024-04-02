import "./Home.scss";
import TopLaunches from "../../components/home/top-launches/TopLaunches";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Outlet />
      </div>
      <TopLaunches />
    </>
  );
};

export default Home;

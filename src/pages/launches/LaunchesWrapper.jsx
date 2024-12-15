import { Outlet, useParams } from "react-router-dom";
import LaunchArchive from "../../components/pages/launches/LaunchArchive";
import LeaderBoardHeading from "../../components/pages/launches/LeaderBoardHeading";

const LaunchesWrapper = () => {

  const { year, month, day } = useParams();
  const routeType = location.pathname.split("/")[2];

  return (
    <>
      <div className="launches-container">
        <LeaderBoardHeading year={year} month={month} day={day} type={routeType} />
        <Outlet />
      </div>
      <LaunchArchive type={routeType} />
    </>
  );
};

export default LaunchesWrapper;
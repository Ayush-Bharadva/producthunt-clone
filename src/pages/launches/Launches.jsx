import { NavLink, useLocation, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import "./Launches.scss";
import ProductCard from "../../components/common/product-card/ProductCard";
import DateSelector from "./DateSelector";
import LaunchArchive from "./LaunchArchive";
import { extractDateInfo, getWeekDatesFromNumber, pstCurrentDate } from "../../utils/helper";
import { useFetchProducts } from "../../hooks/useFetchProducts";

const isActiveLink = ({ isActive }) => (isActive ? "link link-active" : "link");
const isButtonActive = ({ isActive }) => (isActive ? "category-btn active" : "category-btn");

const { weekNumber } = extractDateInfo(pstCurrentDate);
const [currentYear, currentMonth, currentDay] = pstCurrentDate.split("-");

const Launches = () => {

  const { year, month, week, day } = useParams();
  const location = useLocation();
  const routeType = location.pathname.split("/")[2];

  let postedAfter, postedBefore;

  if (!month && !week && !day) {
    postedAfter = `${year}-01-01`;
    postedBefore = `${year}-12-31`;
  } else if (month && !week) {
    postedAfter = `${year}-${month}-01`;
    postedBefore = `${year}-${month}-31`;
  } else if (week && !month && !day) {
    const [startDate, endDate] = getWeekDatesFromNumber(year, week);
    postedAfter = startDate;
    postedBefore = endDate;
  } else if (day) {
    postedAfter = `${year}-${month}-${day}`;
    postedBefore = `${year}-${month}-${+day + 1}`;
  }

  const { productsList, hasMore, error, handleLoadMore } = useFetchProducts({
    featured: true,
    order: "VOTES",
    postedAfter,
    postedBefore,
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="launches-container">
        <LeaderBoardHeading year={year} month={month} day={day} type={routeType} />
        <DateSelector />
        <InfiniteScroll
          className="posts-container"
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<CircularProgress />}
          threshold={50}
          initialLoad={false}>
          {productsList.map(product => <ProductCard key={product.id} product={product} />)}
        </InfiniteScroll>
      </div>
      <LaunchArchive type={routeType} />
    </>
  );
};

export default Launches;

const LeaderBoardHeading = ({ year, month, day, type }) => {

  let link = null;
  let heading = "Best of ";

  switch (type) {
    case "daily":
      link = `/leaderboard/daily/${year}/${month}/${day}`;
      heading += `${day}-${month}-${year}`;
      break;
    case "weekly":
      link = `/leaderboard/weekly/${year}/${weekNumber}`;
      heading += `week ${weekNumber}-${year}`;
      break;
    case "monthly":
      link = `/leaderboard/monthly/${year}/${month}`;
      heading += `${year}-${month}`;
      break;
    case "yearly":
      link = `/leaderboard/yearly/${year}`;
      heading += `${year}`;
      break;
    default:
      break;
  }

  return (
    <div className="launches-heading">
      <h4 className="heading-text">{heading}</h4>
      <div className="routes">
        <NavLink className={isActiveLink} to={`/leaderboard/daily/${currentYear}/${currentMonth}/${currentDay}`}>
          Daily
        </NavLink>
        <NavLink className={isActiveLink} to={`/leaderboard/weekly/${currentYear}/${weekNumber}`}>
          Weekly
        </NavLink>
        <NavLink className={isActiveLink} to={`/leaderboard/monthly/${currentYear}/${currentMonth}`}>
          Monthly
        </NavLink>
        <NavLink className={isActiveLink} to={`/leaderboard/yearly/${currentYear}`}>
          Yearly
        </NavLink>
      </div>
      <div className="button-group">
        <NavLink to={link} className={isButtonActive} end>
          Featured
        </NavLink>
        <span>|</span>
        <NavLink to={`${link}/all`} className={isButtonActive} end>
          All
        </NavLink>
      </div>
    </div>
  );
};

LeaderBoardHeading.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.string,
  type: PropTypes.string,
};
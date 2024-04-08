import { NavLink, useLocation, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import "./Launches.scss";
import ProductCard from "../../components/common/product-card/ProductCard";
import DateSelector from "./DateSelector";
import LaunchArchive from "./LaunchArchive";
import { extractDateInfo, getHeading, getLink, getPostedDates, pstCurrentDate } from "../../utils/helper";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useMemo } from "react";

const isActiveLink = ({ isActive }) => (isActive ? "link link-active" : "link");
const isActiveButton = ({ isActive }) => (isActive ? "category-btn active" : "category-btn");

const Launches = () => {

  const { year, month, week, day } = useParams();
  const location = useLocation();
  const routeType = location.pathname.split("/")[2];

  const { startDate, endDate } = getPostedDates({ year, month, week, day });

  const { productsList, hasMore, error, loading, handleLoadMore } = useFetchProducts({
    featured: true,
    order: "VOTES",
    postedAfter: startDate,
    postedBefore: endDate
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="launches-container">
        <LeaderBoardHeading year={year} month={month} day={day} type={routeType} />
        <DateSelector />
        {loading ?
          <CircularProgress /> :
          <InfiniteScroll
            className="posts-container"
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={<CircularProgress />}
            threshold={50}
            initialLoad={false}>
            {productsList.map(product => <ProductCard key={product.id} product={product} />)}
          </InfiniteScroll>}
        {!loading && !hasMore && productsList.length === 0 ? <p>No Products found</p> : null}
      </div>
      <LaunchArchive type={routeType} />
    </>
  );
};

export default Launches;

/* LeaderBoardHeading */

const LeaderBoardHeading = ({ year, month, day, type }) => {

  const { weekNumber } = extractDateInfo(pstCurrentDate);
  const [currentYear, currentMonth, currentDay] = pstCurrentDate.split("-");

  const link = useMemo(() => getLink({ type, year, month, day, weekNumber }), [day, month, type, weekNumber, year]);
  const heading = useMemo(() => getHeading({ type, year, month, day, weekNumber }), [day, month, type, weekNumber, year]);

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
        <NavLink to={link.featured} className={isActiveButton} end>
          Featured
        </NavLink>
        <span>|</span>
        <NavLink to={link.all} className={isActiveButton} end>
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
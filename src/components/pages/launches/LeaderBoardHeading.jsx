import { PropTypes } from "prop-types";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { extractDateInfo, getHeading, getLink, pstCurrentDate } from "../../../utils/helper";

const isActiveLink = ({ isActive }) => (isActive ? "link link-active" : "link");
const isActiveButton = ({ isActive }) => (isActive ? "category-btn active" : "category-btn");

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

export default LeaderBoardHeading;

LeaderBoardHeading.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.string,
  type: PropTypes.string,
};
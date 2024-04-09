import { memo, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import { eachMonthOfInterval, format } from "date-fns";
import { years } from "../../utils/constants";

const isActiveLink = ({ isActive }) => isActive ? "archive-link active" : "archive-link";

const LaunchArchive = memo(function LaunchArchive({ type }) {

  const { year: selectedYear, month, week, day } = useParams();
  const showMonths = type === "monthly" ? true : false;

  const linkEndPoint = useMemo(() => {
    switch (type) {
      case "daily":
        return `${month}/${day}`;
      case "weekly":
        return `${week}`;
      case "monthly":
        return `${month}`;
      default:
        return "";
    }
  }, [type, month, week, day]);

  return (
    <div className="launch-archive">
      <p className="launch-archive-heading">LAUNCH ARCHIVE</p>
      <div className="archive-list">
        {years.map((year, index) => {
          return (
            <div key={index} className="archive">
              <NavLink
                to={`/leaderboard/${type}/${year}/${linkEndPoint}`}
                className={isActiveLink} end>
                {year}
              </NavLink>
              <MonthSelector showMonths={showMonths} selectedYear={selectedYear} year={year} />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LaunchArchive;

LaunchArchive.propTypes = {
  type: PropTypes.string
};

const MonthSelector = ({ showMonths, selectedYear, year }) => {

  const months = useMemo(() => eachMonthOfInterval({
    start: new Date(selectedYear, 0, 1),
    end: new Date(selectedYear, 11, 31),
  }), [selectedYear]);

  const formattedMonths = useMemo(() => months.map(date => {
    return format(date, "MMMM");
  }), [months]);


  return (showMonths && selectedYear === year) ? (
    <ul className="months-selector">
      {formattedMonths.map((month, index) => (
        <li key={index}>
          <NavLink
            to={`/leaderboard/monthly/${year}/${index + 1}`}
            className="month">
            {month}
          </NavLink>
        </li>
      ))}
    </ul>
  ) : null;
};

MonthSelector.propTypes = {
  showMonths: PropTypes.bool,
  selectedYear: PropTypes.string,
  year: PropTypes.string
};
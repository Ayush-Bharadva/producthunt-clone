import { memo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import { eachMonthOfInterval, format } from "date-fns";
import { years } from "../../utils/constants";

const isActiveLink = ({ isActive }) => isActive ? "archive-link active" : "archive-link";

const LaunchArchive = memo(function LaunchArchive({ type }) {

  const { year: selectedYear } = useParams();
  const showMonths = type === "monthly" ? true : false;

  return (
    <div className="launch-archive">
      <p className="launch-archive-heading">LAUNCH ARCHIVE</p>
      <div className="archive-list">
        {years.map((year, index) => {
          return (
            <div key={index} className="archive">
              <NavLink
                to={`/leaderboard/yearly/${year}`}
                className={isActiveLink}>
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

  const months = eachMonthOfInterval({
    start: new Date(selectedYear, 0, 1),
    end: new Date(selectedYear, 11, 31),
  });

  const formattedMonths = months.map(month => format(month, "MMMM"));

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
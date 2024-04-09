import { memo, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import { years } from "../../../utils/constants";
import MonthSelector from "./MonthSelector";

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


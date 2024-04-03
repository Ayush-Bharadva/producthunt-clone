import { NavLink } from "react-router-dom";
import { years } from "../../utils/constants";
import { memo } from "react";

const LaunchArchive = memo(function LaunchArchive() {
  return (
    <div className="launch-archive">
      <p className="launch-archive-heading">LAUNCH ARCHIVE</p>
      <div className="archive-list">
        {years.map((year, index) => {
          return (
            <div key={index} className="archive">
              <NavLink
                to={`/leaderboard/yearly/${year}`}
                className={({ isActive }) => (isActive ? "archive-link active" : "archive-link")}>
                {year}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LaunchArchive;
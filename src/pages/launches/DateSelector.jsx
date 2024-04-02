import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Weeks, days } from "../../utils/constants";
import { formatDate, pstCurrentDate } from "../../utils/helper";

const currentDay = formatDate(pstCurrentDate).split("-")[2];

const DateSelector = () => {

  const location = useLocation();
  const isWeekly = location.pathname.includes("weekly");

  const { year, month, week, day } = useParams();

  console.log("params :", year, month, week, day);

  let leftArrowLink = isWeekly ? `/leaderboard/weekly/2024/${week - 1}` : `/leaderboard/daily/2024/3/${day - 1}`;
  let rightArrowLink = isWeekly ? `/leaderboard/weekly/2024/${week + 1}` : `/leaderboard/daily/2024/3/${+day + 1}`;

  return (
    <div className="pagination-container">
      <NavLink className="arrow-btn" to={leftArrowLink}>
        <GoArrowLeft />
      </NavLink>
      <div className="pages">
        {!isWeekly
          ? days.map((day, index) => (
            <NavLink key={index} to={`/leaderboard/daily/${year}/${month}/${day}`} className={({ isActive }) => (isActive ? "page selected" : "page")}>
              <button type="button" className={+currentDay < +day ? "disabled" : ""} disabled={+currentDay < +day}>
                {day}
              </button>
            </NavLink>
          ))
          : Weeks.map((week, index) => (
            <NavLink key={index} to={`/leaderboard/weekly/${year}/${index + 11}`} className={({ isActive }) => (isActive ? "page selected" : "page")}>
              {week}
            </NavLink>
          ))}
      </div>
      <NavLink className="arrow-btn" to={rightArrowLink}>
        <GoArrowRight />
      </NavLink>
    </div>
  );
};

export default DateSelector;
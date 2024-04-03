import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { days } from "../../utils/constants";
import { formatDate, getWeekGroupsFromDate, pstCurrentDate } from "../../utils/helper";

const currentDay = formatDate(pstCurrentDate).split("-")[2];

const DateSelector = () => {

  const location = useLocation();
  const isDaily = location.pathname.includes("daily");
  const isWeekly = location.pathname.includes("weekly");

  const { year, month, week, day } = useParams();

  const weekGroups = getWeekGroupsFromDate(pstCurrentDate);

  let leftArrowLink = isWeekly ? `/leaderboard/weekly/2024/${week - 1}` : `/leaderboard/daily/2024/3/${day - 1}`;
  let rightArrowLink = isWeekly ? `/leaderboard/weekly/2024/${week + 1}` : `/leaderboard/daily/2024/3/${+day + 1}`;

  return isWeekly || isDaily ? (
    <div className="pagination-container">
      <NavLink className="arrow-btn" to={leftArrowLink}>
        <GoArrowLeft />
      </NavLink>
      <div className="pages">
        {isDaily && days.map((day, index) => (
          <NavLink key={index} to={`/leaderboard/daily/${year}/${month}/${day}`} className={({ isActive }) => (isActive ? "day selected" : "day")}>
            <button type="button" className={+currentDay < +day ? "disabled" : ""} disabled={+currentDay < +day}>
              {day}
            </button>
          </NavLink>
        ))}
        {isWeekly && weekGroups.map(({ startDate, endDate }, index) => (
          <NavLink key={index} to={`/leaderboard/weekly/${year}/${index + 1}`} className={({ isActive }) => (isActive ? "week selected" : "week")}>
            {startDate}-{endDate}
          </NavLink>
        ))}
      </div>
      <NavLink className="arrow-btn" to={rightArrowLink}>
        <GoArrowRight />
      </NavLink>
    </div>
  ) : null;
};

export default DateSelector;
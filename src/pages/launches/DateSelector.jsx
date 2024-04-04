import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { extractDaysInfo, getWeekGroupsFromDate, pstCurrentDate } from "../../utils/helper";
import { useMemo } from "react";

const DateSelector = () => {

  const location = useLocation();
  const isDaily = location.pathname.includes("daily");
  const isWeekly = location.pathname.includes("weekly");

  const { year, month, week, day } = useParams();

  const extractedDays = useMemo(() => {
    if (isDaily) {
      return extractDaysInfo(year, month, day);
    }
  }, [year, month, day, isDaily]);

  const weekGroups = getWeekGroupsFromDate(pstCurrentDate);

  console.log("extractedDays", extractedDays);

  let leftArrowLink = isWeekly ? `/leaderboard/weekly/2024/${week - 1}` : `/leaderboard/daily/2024/3/${day - 1}`;
  let rightArrowLink = isWeekly ? `/leaderboard/weekly/2024/${week + 1}` : `/leaderboard/daily/2024/3/${+day + 1}`;

  return isWeekly || isDaily ? (
    <div className="pagination-container">
      <NavLink to={leftArrowLink}>
        <GoArrowLeft className="left-arrow-icon" />
      </NavLink>
      <div className="pages">
        {isDaily && extractedDays?.map(({ label, isValid }) => (
          <div key={label}>
            {isValid ?
              <NavLink to={`/leaderboard/daily/${year}/${month}/${label}`} className={({ isActive }) => (isActive ? "day selected" : "day")} end>
                {label}
              </NavLink> :
              <button type="button" className="day disabled" disabled>{label}</button>}
          </div>
        ))}
        {isWeekly && weekGroups.map(({ startDate, endDate }, index) => (
          <NavLink key={`${startDate}-${endDate}`} to={`/leaderboard/weekly/${year}/${index + 1}`} className={({ isActive }) => (isActive ? "week selected" : "week")}>
            {startDate}-{endDate}
          </NavLink>
        ))}
      </div>
      <NavLink to={rightArrowLink}>
        <GoArrowRight className="right-arrow-icon" />
      </NavLink>
    </div>
  ) : null;
};

export default DateSelector;
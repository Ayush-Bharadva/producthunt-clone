import { Fragment, useMemo } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { extractDaysInfo, getWeekGroupsFromDate, pstCurrentDate } from "../../utils/helper";

const DateSelector = () => {

  const { year, month } = useParams();
  const location = useLocation();
  const type = location.pathname.split("/")[2];

  const extractedDays = useMemo(() => {
    if (type === "daily") {
      return extractDaysInfo(year, month);
    }
  }, [year, month, type]);

  const weekGroups = getWeekGroupsFromDate(pstCurrentDate);

  let leftArrowLink = "", rightArrowLink = "";

  return type === "weekly" || type === "daily" ? (
    <div className="pagination-container">
      <NavLink to={leftArrowLink}>
        <GoArrowLeft className="left-arrow-icon" />
      </NavLink>
      <div className="pages">
        {type === "daily" && extractedDays?.map(({ label, isValid }) => (
          <Fragment key={label}>
            {isValid ?
              <NavLink to={`/leaderboard/daily/${year}/${month}/${label}`} className={({ isActive }) => (isActive ? "day selected" : "day")} end>
                {label}
              </NavLink> :
              <button type="button" className="day disabled" disabled>{label}</button>}
          </Fragment>
        ))}
        {type === "weekly" && weekGroups.map(({ startDate, endDate }, index) => (
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
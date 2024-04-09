import { Fragment, useMemo } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { checkIsDateValid, extractDaysInfo, getNextDate, getPreviousDate, getWeekGroupsFromDate, pstCurrentDate } from "../../utils/helper";

const DateSelector = () => {

  const { year, month, week, day } = useParams();
  const location = useLocation();
  const type = location.pathname.split("/")[2];

  const extractedDays = useMemo(() => {
    if (type === "daily") {
      return extractDaysInfo(year, month);
    }
  }, [year, month, type]);

  const weekGroups = getWeekGroupsFromDate(pstCurrentDate);

  const leftBtnLink = useMemo(() => {
    if (type === "daily") {
      const [pYear, pMonth, pDay] = getPreviousDate(`${year}-${month}-${day}`).split("-");
      return `/leaderboard/daily/${pYear}/${pMonth}/${pDay}`;
    } else if (type === "weekly") {
      return `/leaderboard/weekly/${year}/${week - 1}`;
    }
  }, [type, year, month, day, week]);

  const rightBtnLink = useMemo(() => {
    if (type === "daily") {
      const [nYear, nMonth, nDay] = getNextDate(`${year}-${month}-${day}`).split("-");
      return `/leaderboard/daily/${nYear}/${nMonth}/${nDay}`;
    } else if (type === "weekly") {
      return `/leaderboard/weekly/${year}/${week + 1}`;
    }
  }, [type, year, month, day, week]);

  const isValidDate = useMemo(() => checkIsDateValid(`${year}-${month}-${day}`), [year, month, day]);

  return type === "weekly" || type === "daily" ? (
    <div className="pagination-container">
      <>
        <NavLink to={leftBtnLink}>
          <GoArrowLeft className="left-arrow-icon" />
        </NavLink>
      </>
      <div className="pages">
        {type === "daily" && extractedDays.map(({ label, isValid }) => (
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
      <>
        {isValidDate ? <NavLink to={rightBtnLink}>
          <GoArrowRight className="right-arrow-icon" />
        </NavLink> :
          <GoArrowRight className="disabled-btn" />
        }
      </>
    </div>
  ) : null;
};

export default DateSelector;
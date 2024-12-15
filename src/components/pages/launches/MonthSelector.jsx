import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { eachMonthOfInterval, format } from "date-fns";

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

export default MonthSelector;

MonthSelector.propTypes = {
  showMonths: PropTypes.bool,
  selectedYear: PropTypes.string,
  year: PropTypes.string
};
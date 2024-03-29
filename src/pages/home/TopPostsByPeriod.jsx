import { PropTypes } from "prop-types";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { NavLink, useNavigate } from "react-router-dom";
import PostCard from "../../components/common/post-card/PostCard";
import { startOfToday, subDays, subWeeks } from "date-fns";
import { formatDate, getWeekNumberByDate } from "../../utils/helper";

// today
const today = startOfToday();
console.log('Today:', formatDate(today));

// // Get yesterday's date
const yesterday = formatDate(subDays(new Date(today), 1));

const currentDate = new Date().toISOString();

const TopPostsByPeriod = ({ title, periodLabel }) => {

  const navigate = useNavigate();

  // const navigate = useNavigate();
  console.log("periodLabel", periodLabel)

  let postedAfterDate = null;
  let postedBeforeDate = null;

  const [year, month, day] = yesterday.split('-');

  const selectedDate = currentDate;
  const previousWeekNumber = getWeekNumberByDate(subWeeks(new Date(selectedDate), 1));
  console.log("previousWeekNumber", previousWeekNumber);

  if (periodLabel === "Yesterday") {
    postedAfterDate = yesterday;
    postedBeforeDate = today;
  } else if (periodLabel === "Weekly") {
    postedAfterDate = "2024-03-18";
    postedBeforeDate = "2024-03-24";
  } else if (periodLabel === "Monthly") {
    postedAfterDate = "2024-02-01";
    postedBeforeDate = "2024-02-29";
  }

  const { data, error } = useQuery(GET_POSTS, {
    variables: {
      "first": 5,
      "featured": true,
      "order": "VOTES",
      "postedAfter": postedAfterDate || null,
      "postedBefore": postedBeforeDate || null
    },
    keepPreviousData: true
  });

  let navigationPath = "";
  if (periodLabel === "Yesterday") {
    navigationPath = `/leaderboard/daily/${year}/${month}/${day}`;
  } else if (periodLabel === "Weekly") {
    navigationPath = `/leaderboard/weekly/${year}/${previousWeekNumber}`;
  } else if (periodLabel === "Monthly") {
    navigationPath = `/leaderboard/monthly/${year}/${month}`;
  }

  const handleNavigation = () => {
    navigate(navigationPath);
  };

  console.log("navigationPath", navigationPath);

  const productsList = useMemo(() => data?.posts?.nodes || [], [data]);

  if (error) {
    <p>Error: {error.message}</p>;
  }

  return (
    <div className="period-wise-products">
      <div className="heading">
        <p className="title">{title}</p>
        <div className="button-group">
          <NavLink to={navigationPath} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>Featured</NavLink>
          <span>|</span>
          <NavLink to={`${navigationPath}/all`} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>All</NavLink>
        </div>
      </div>
      {productsList.length > 0 &&
        (<div>
          {productsList?.map(post => <PostCard key={post.id} post={post} />)}
        </div>)}
      <button className="see-all-button" onClick={handleNavigation}>
        See all {title.toLowerCase()}
      </button>
    </div>
  );
}

export default TopPostsByPeriod;

TopPostsByPeriod.propTypes = {
  featured: PropTypes.bool,
  title: PropTypes.string,
  periodLabel: PropTypes.string,
  postedBefore: PropTypes.string,
  postedAfter: PropTypes.string,
  filterAllPosts: PropTypes.func
};
import { PropTypes } from "prop-types";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { NavLink, useNavigate } from "react-router-dom";
import PostCard from "../../components/common/post-card/PostCard";
import { endOfMonth, endOfWeek, format, startOfMonth, startOfToday, startOfWeek, subDays, subMonths, subWeeks } from "date-fns";

function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}

// today
const today = startOfToday();
console.log('Today:', formatDate(today));

// Get yesterday's date
const yesterday = formatDate(subDays(new Date(today), 1));

// Get last week's starting and ending dates
const lastWeekStart = formatDate(startOfWeek(subWeeks(new Date(), 1)));
const lastWeekEnd = formatDate(endOfWeek(subWeeks(new Date(), 1)));

// Get last month's starting and ending dates
const lastMonthStart = formatDate(startOfMonth(subMonths(new Date(), 1)));
const lastMonthEnd = formatDate(endOfMonth(subMonths(new Date(), 1)));

console.log('Yesterday:', yesterday);
console.log('Last week start:', lastWeekStart);
console.log('Last week end:', lastWeekEnd);
console.log('Last month start:', lastMonthStart);
console.log('Last month end:', lastMonthEnd);

const TopPostsByPeriod = ({ title, periodLabel }) => {

  const navigate = useNavigate();

  // const navigate = useNavigate();
  console.log("periodLabel", periodLabel)

  let postedAfterDate = null;
  let postedBeforeDate = null;

  const [year, month, day] = yesterday.split('-');
  console.log(year, month, day);

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
    navigationPath = `/leaderboard/weekly/${year}/13`;
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
          <NavLink to={navigationPath} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>All</NavLink>
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

/*
const handleLoadMore = useCallback(() => {
  if (!hasMore) {
    const previousDate = getPreviousDate(currentDate);
    setHeading(previousDate);
    fetchMore({
      variables: {
        "first": 10,
        "postedAfter": previousDate,
        "postedBefore": currentDate,
        "after": null
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        const { posts } = fetchMoreResult;
        setPostState((prev) => ({
          postsList: [...prev.postsList, ...posts.nodes],
          hasMore: posts.pageInfo.hasNextPage,
          endCursor: posts.pageInfo.endCursor
        }));
        return {
          posts: {
            ...posts,
            nodes: [...prev.posts.nodes, ...posts.nodes],
            pageInfo: posts.pageInfo
          }
        };
      }
    });
  } else {
    fetchMore({
      variables: {
        "after": endCursor
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        const { posts } = fetchMoreResult;
        setPostState((prev) => ({
          postsList: [...prev.postsList, ...posts.nodes],
          hasMore: posts.pageInfo.hasNextPage,
          endCursor: posts.pageInfo.endCursor
        }));
        return {
          posts: {
            ...posts,
            nodes: [...prev.posts.nodes, ...posts.nodes],
            pageInfo: posts.pageInfo
          }
        };
      }
    });
  }
}, [endCursor, fetchMore, hasMore, currentDate]);
*/
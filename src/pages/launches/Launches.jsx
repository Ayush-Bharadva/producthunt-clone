import { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { NavLink, useLocation, useParams } from "react-router-dom";
import "./Launches.scss";
import { years } from "../../utils/constants";
import ProductCard from "../../components/common/product-card/ProductCard";
import { GET_POSTS } from "../../graphql/queries";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import { getWeekDatesFromNumber } from "../../utils/helper";
import DateSelector from "./DateSelector";

const isActiveLink = ({ isActive }) => (isActive ? "link link-active" : "link");
const isButtonActive = ({ isActive }) => (isActive ? "category-btn active" : "category-btn");

const calculatePostedAfterDate = (year, month, day, isWeekly, weekNumber) => {
  if (!isWeekly) {
    return `${year}-${month}-${day}`;
  } else {
    return getWeekDatesFromNumber(year, weekNumber);
  }
};
const calculatePostedBeforeDate = (year, month, day, isWeekly, weekNumber) => {
  if (!isWeekly) {
    return `${year}-${month}-${day + 1}`;
  } else {
    return getWeekDatesFromNumber(year, +weekNumber + 1);
  }
};

const Launches = () => {
  const location = useLocation();
  const isWeekly = location.pathname.includes("weekly");

  const { year, month, week, day } = useParams();

  // console.log(year, month, week, day);

  const [postState, setPostState] = useState({
    postsList: [],
    endCursor: null,
    hasMore: true,
  });

  const { postsList, endCursor, hasMore } = postState;

  // let leftArrowLink = isWeekly ? `/leaderboard/weekly/2024/${week - 1}` : `/leaderboard/daily/2024/3/${day - 1}`;
  // let rightArrowLink = isWeekly ? `/leaderboard/weekly/2024/${week + 1}` : `/leaderboard/daily/2024/3/${parseInt(day) + 1}`;

  const { error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      "first": 10,
      "featured": true,
      "postedAfter": calculatePostedAfterDate(year, month, day, isWeekly, week),
      "postedBefore": calculatePostedBeforeDate(year, month, day, isWeekly, week),
      "after": null,
      "order": "VOTES"
    },
    onCompleted: (data) => {
      const { posts } = data ?? {};
      setPostState(() => ({
        postsList: posts.nodes ?? [],
        hasMore: posts.pageInfo.hasNextPage ?? false,
        endCursor: posts.pageInfo.endCursor ?? null,
      }));
    },
  });

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
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
  }, [endCursor, fetchMore, hasMore]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // console.log("postsList", postsList);

  return (
    <>
      <div className="launches-container">
        <div className="launches-heading">
          <div className="heading-text">Best of {year}-{month}-{day}</div>
          <div className="routes">
            <NavLink className={isActiveLink} to={`/leaderboard/daily/${year}/${month}/${day}`}>
              Daily
            </NavLink>
            <NavLink className={isActiveLink} to={`/leaderboard/weekly/${year}/${week}`}>
              Weekly
            </NavLink>
            <NavLink className={isActiveLink} to={`/leaderboard/monthly/${year}/${month}`}>
              Monthly
            </NavLink>
            <NavLink className={isActiveLink} to={`/leaderboard/yearly/${year}`}>
              Yearly
            </NavLink>
          </div>
          <div className="button-group">
            <NavLink to={`/leaderboard/daily/${year}/${month}/${day}`} className={isButtonActive} end>
              Featured
            </NavLink>
            <span>|</span>
            <NavLink to={`/leaderboard/daily/${year}/${month}/${day}/all`} className={isButtonActive} end>
              All
            </NavLink>
          </div>
        </div>
        <DateSelector />
        <InfiniteScroll
          className="posts-container"
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<CircularProgress />}
          threshold={50}
          initialLoad={false}>
          {postsList.map(post => <ProductCard key={post.id} post={post} />)}
        </InfiniteScroll>
      </div>
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
    </>
  );
};

export default Launches;

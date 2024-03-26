import { useState } from "react";
import { useQuery } from "@apollo/client";
import { NavLink, useLocation } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "./Launches.scss";
import { Weeks, days, years } from "../../utils/constants";
import PostCard from "../../components/common/post-card/PostCard";
import { GET_POSTS } from "../../graphql/queries";
import { getTodaysDate } from "../../utils/helper";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";

const isActiveLink = ({ isActive }) => (isActive ? "link link-active" : "link");
const isButtonActive = ({ isActive }) => (isActive ? "category-btn active" : "category-btn");

const Launches = () => {
  const location = useLocation();
  const isWeekly = location.pathname.includes("weekly");

  const todaysDate = getTodaysDate();
  // const yesterdaysDate = getYesterdaysDate();

  const [postState, setPostState] = useState({
    postsList: [],
    endCursor: null,
    hasMore: true,
  });
  // const [isFeaturedPosts, setIsFeaturedPosts] = useState(true);

  const { postsList, endCursor, hasMore } = postState;

  const { error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      "first": 10,
      "featured": true,
      "postedAfter": todaysDate,
      "after": null,
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

  const handleLoadMore = () => {
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
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="launches-container">
        <div className="launches-heading">
          <div className="heading-text">Best of March 12, 2024</div>
          <div className="routes">
            <NavLink className={isActiveLink} to={`/leaderboard/daily/2024/3/21`}>
              Daily
            </NavLink>
            <NavLink className={isActiveLink} to={`/leaderboard/weekly/2024/11`}>
              Weekly
            </NavLink>
            <NavLink className={isActiveLink} to={`/leaderboard/monthly/2024/3`}>
              Monthly
            </NavLink>
            <NavLink className={isActiveLink} to={`/leaderboard/yearly/2024`}>
              Yearly
            </NavLink>
          </div>
          <div className="button-group">
            <NavLink to="/leaderboard/daily/2024/3/21" className={isButtonActive} end>
              Featured
            </NavLink>
            <span>|</span>
            <NavLink to="/leaderboard/daily/2024/3/21/all" className={isButtonActive} end>
              All
            </NavLink>
          </div>
        </div>
        <div className="pagination-container">
          <GoArrowLeft />
          <div className="pages">
            {!isWeekly
              ? days.map((day, index) => (
                <NavLink key={index} to={`/leaderboard/daily/2024/3/${day}`} className={({ isActive }) => (isActive ? "page selected" : "page")}>
                  {day}
                </NavLink>
              ))
              : Weeks.map((week, index) => (
                <NavLink key={index} to={`/leaderboard/weekly/2024/${index + 11}`} className={({ isActive }) => (isActive ? "page selected" : "page")}>
                  {week}
                </NavLink>
              ))}
          </div>
          <GoArrowRight />
        </div>
        <InfiniteScroll
          className="posts-container"
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<CircularProgress />}
          threshold={50}
          initialLoad={false}>
          {postsList.map(post => <PostCard key={post.id} post={post} />)}
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
                  className={({ isActive }) => (isActive ? "archive-link active" : "archive-link")}
                >
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

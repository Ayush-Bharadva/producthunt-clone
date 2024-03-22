import { useQuery } from "@apollo/client";
import { NavLink } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import "./Home.scss";
import { GET_POSTS } from "../../graphql/queries";
import TopLaunches from "../../components/home/top-launches/TopLaunches";
import PostCard from "../../components/common/post-card/PostCard";
import { lazy, useCallback, useState } from "react";
import { PropTypes } from "prop-types";
import { getTodaysDate } from "../../utils/helper";

const TopPostsByPeriod = lazy(() => import("./TopPostsByPeriod"));

const Home = () => {

  const [todaysDate, year, month, day] = getTodaysDate();

  const [postState, setPostState] = useState({
    postsList: [],
    endCursor: null,
    hasMore: true
  });
  const [isFeaturedPosts, setIsFeaturedPosts] = useState(true);

  const filterAllPosts = () => {
    setIsFeaturedPosts(false);
  };

  const { postsList, endCursor, hasMore } = postState;

  const { error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      "first": 10,
      "featured": isFeaturedPosts,
      "postedAfter": todaysDate,
      "after": null,
    },
    onCompleted: (data) => {
      const { posts } = data ?? {};
      setPostState(() => ({
        postsList: posts.nodes,
        hasMore: posts.pageInfo.hasNextPage,
        endCursor: posts.pageInfo.endCursor
      }));
    }
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
          setPostState((prev) => ({
            postsList: [...prev.postsList, ...fetchMoreResult.posts.nodes],
            hasMore: fetchMoreResult.posts.pageInfo.hasNextPage,
            endCursor: fetchMoreResult.posts.pageInfo.endCursor
          }));
          return fetchMoreResult;
        }
      });
    }
  }, [endCursor, hasMore, fetchMore]);

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <div className="home-container">
        <div className="heading">
          <p className="title">Top Products Launching Today</p>
          <div className="button-group">
            <NavLink to="/" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>Featured</NavLink>
            <span>|</span>
            <NavLink to="/all" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>All</NavLink>
          </div>
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
        {!hasMore ?
          <>
            <TopPostsByPeriod
              featured={isFeaturedPosts}
              filterAllPosts={filterAllPosts}
              title="Yesterday's Top Products"
              periodLabel={`daily/${year}/${month}/${day}`}
              postedAfter="2024-03-20"
              postedBefore="2024-03-21"
            />
            <TopPostsByPeriod
              featured={isFeaturedPosts}
              filterAllPosts={filterAllPosts}
              title="Last Week's Top Products"
              periodLabel={`weekly/${year}/11`}
              postedAfter="2024-03-11"
              postedBefore="2024-03-17"
            />
            <TopPostsByPeriod
              featured={isFeaturedPosts}
              filterAllPosts={filterAllPosts}
              title="Last Month's Top Products"
              periodLabel={`monthly/${year}/3`}
              postedAfter="2024-03-1"
              postedBefore="2024-03-20"
            />
          </>
          : null}
      </div>
      <TopLaunches />
    </>
  )
}

export default Home;

Home.propTypes = {
  featured: PropTypes.bool
};

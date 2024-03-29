import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@apollo/client";
import "./Home.scss";
import PostCard from "../../components/common/post-card/PostCard";
import { useCallback, useState } from "react";
import { GET_POSTS } from "../../graphql/queries";
import { formatDate, showToast } from "../../utils/helper";
import TopPostsByPeriod from "./TopPostsByPeriod";
import { PeriodLabel } from "../../utils/constants";
import TopLaunches from "../../components/home/top-launches/TopLaunches";

const currentDate = new Date().toISOString();

const Home = () => {

  const [postState, setPostState] = useState({
    postsList: [],
    endCursor: null,
    hasMore: true
  });

  const { postsList, endCursor, hasMore } = postState;

  const { loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      "first": 10,
      "featured": true,
      "postedAfter": formatDate(currentDate),
      "after": null,
    },
    onCompleted: (data) => {
      const { posts } = data ?? {};
      setPostState({
        postsList: posts.nodes ?? [],
        hasMore: posts.pageInfo.hasNextPage ?? false,
        endCursor: posts.pageInfo.endCursor ?? null,
      });
    }
  });

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMore({
        variables: {
          "after": endCursor
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const { posts } = fetchMoreResult;
          setPostState(prevState => ({
            postsList: [...prevState.postsList, ...posts.nodes],
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
  }, [endCursor, fetchMore, hasMore, loading]);

  if (error) {
    showToast("error", error.message);
    return <p>Error: {error.message}</p>;
  }

  console.log('hasMore:', hasMore, "endCursor:", endCursor);

  return (
    <>
      <div className="home-container">
        <div className="heading">
          <p className="title">Top Products Launching on {formatDate(currentDate)}</p>
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
              title="Yesterday's Top Products"
              periodLabel={PeriodLabel.yesterday}
            />
            <TopPostsByPeriod
              title="Last Week's Top Products"
              periodLabel={PeriodLabel.weekly}
            />
            <TopPostsByPeriod
              title="Last Month's Top Products"
              periodLabel={PeriodLabel.monthly}
            />
          </>
          : null}
      </div>
      <TopLaunches />
    </>
  );
}

export default Home;

Home.propTypes = {
  featured: PropTypes.bool
};

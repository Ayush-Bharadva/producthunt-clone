import { useQuery } from "@apollo/client"
import { NavLink } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import "./Home.scss";
import { GET_POSTS } from "../../graphql/queries";
import TopLaunches from "../../components/home/top-launches/TopLaunches";
import PostCard from "../../components/common/post-card/PostCard";
import { useState } from "react";
import { PropTypes } from "prop-types";
import TopPostsByPeriod from "./TopPostsByPeriod";

const Home = ({ featured }) => {

  const [postState, setPostState] = useState({
    postsData: [],
    endCursor: null,
    hasMore: true
  });

  const { postsData, endCursor, hasMore } = postState;

  const { error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      "first": 10,
      "featured": true,
      "postedAfter": "2024-03-21",
      "after": null,
    },
    onCompleted: (data) => {
      const { posts } = data ?? {};
      setPostState(() => ({
        postsData: posts.nodes,
        hasMore: posts.pageInfo.hasNextPage,
        endCursor: posts.pageInfo.endCursor
      }));
    }
  });

  const handleLoadMore = () => {
    if (hasMore) {
      fetchMore({
        variables: {
          "after": endCursor
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          console.log("fetchMoreResult", fetchMoreResult);

          setPostState((prev) => ({
            postsData: [...prev.postsData, ...fetchMoreResult.posts.nodes],
            hasMore: fetchMoreResult.posts.pageInfo.hasNextPage,
            endCursor: fetchMoreResult.posts.pageInfo.endCursor
          }));
        }
      });
    }
  }

  if (error) return <p>Error: {error.message}</p>;

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
          {postsData.map(post => <PostCard key={post.id} post={post} />)}
        </InfiniteScroll>
        {!hasMore ?
          <>
            <TopPostsByPeriod
              featured={featured}
              title="Yesterday's Top Products"
              periodLabel="daily/2024/3/19"
              postedAfter="2024-03-19"
              postedBefore="2024-03-20"
            />
            <TopPostsByPeriod
              featured={featured}
              title="Last Week's Top Products"
              periodLabel="weekly/2024/11"
              postedAfter="2024-03-11"
              postedBefore="2024-03-17"
            />
            <TopPostsByPeriod
              featured={featured}
              title="Last Month's Top Products"
              periodLabel="monthly/2024/3"
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

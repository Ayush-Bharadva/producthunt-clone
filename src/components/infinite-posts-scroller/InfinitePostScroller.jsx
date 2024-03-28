import { NavLink } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroller"
import PostCard from "../common/post-card/PostCard"
import { CircularProgress } from "@mui/material"
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { useCallback, useState } from "react";
import { format, startOfToday } from "date-fns";
import { showToast } from "../../utils/helper";

const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};

const getPreviousDate = (inputDate) => {
  const date = new Date(inputDate);
  date.setDate(date.getDate() - 1);
  console.log('previous date', date);
  return format(date, 'yyyy-MM-dd');
};

const InfinitePostsViewer = () => {

  const [heading, setHeading] = useState(formatDate(startOfToday()));
  const [postState, setPostState] = useState({
    groupedPosts: {}, // Object to hold posts grouped by date
    endCursor: null,
    hasMore: true
  });

  const { groupedPosts, endCursor, hasMore } = postState;

  const { error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      "first": 10,
      "postedAfter": "2024-03-27",
      "postedBefore": null,
      "after": null,
    },
    onCompleted: (data) => {
      const { posts } = data ?? {};
      setPostState(prevState => ({
        groupedPosts: {
          ...prevState.groupedPosts,
          [heading]: posts.nodes ?? [] // Group posts by date
        },
        hasMore: posts.pageInfo.hasNextPage ?? false,
        endCursor: posts.pageInfo.endCursor ?? null,
      }));
    }
  });

  const handleLoadMore = useCallback(() => {
    if (!hasMore) {
      const previousDate = getPreviousDate(heading);
      setHeading(previousDate);
      fetchMore({
        variables: {
          "first": 10,
          "postedAfter": previousDate,
          "postedBefore": heading,
          "after": endCursor
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const { posts } = fetchMoreResult;
          setPostState(prevState => ({
            groupedPosts: {
              ...prevState.groupedPosts,
              [previousDate]: posts.nodes // Group posts by date
            },
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
          setPostState(prevState => ({
            groupedPosts: {
              ...prevState.groupedPosts,
              [heading]: [...prevState.groupedPosts[heading], ...posts.nodes]
            },
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
  }, [endCursor, fetchMore, hasMore, heading]);

  if (error) {
    showToast("error", error.message);
  }

  // console.log(Object.entries(groupedPosts));

  return (
    <div>
      {Object.entries(groupedPosts).map(([date, posts]) => (
        <div key={date}>
          <div className="heading">
            <p className="title">Top Products Launching on {date}</p>
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
            {posts.map(post => <PostCard key={post.id} post={post} />)}
          </InfiniteScroll>
        </div>
      ))}
    </div>
  )
}

export default InfinitePostsViewer;
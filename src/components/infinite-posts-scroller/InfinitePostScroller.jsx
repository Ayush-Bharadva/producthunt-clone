import { NavLink } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroller"
import PostCard from "../common/post-card/PostCard"
import { CircularProgress } from "@mui/material"
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { useCallback, useState } from "react";
import { format, startOfToday } from "date-fns";

// const today = startOfToday();

const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};

const getPreviousDate = (inputDate) => {
  const date = new Date(inputDate);
  date.setDate(date.getDate() - 1);
  console.log('previous date', date);
  return format(date, 'yyyy-MM-dd');
};

// const currentDate = formatDate(startOfToday()); //27th March 2024

// const InfinitePostsViewer = () => {

//   const [heading, setHeading] = useState(currentDate);

//   const [postState, setPostState] = useState({
//     postsList: [],
//     endCursor: null,
//     hasMore: true,
//     groupedPosts: {}
//   });

//   const { postsList, endCursor, hasMore, groupedPosts } = postState;

//   const { error, fetchMore } = useQuery(GET_POSTS, {
//     variables: {
//       "featured": false,
//       "first": 10,
//       "postedAfter": currentDate, // 27th March 2024
//       // "postedBefore": null, // null
//       "after": null,
//     },
//     onCompleted: (data) => {
//       const { posts } = data ?? {};
//       setPostState(() => ({
//         postsList: posts.nodes ?? [],
//         hasMore: posts.pageInfo.hasNextPage ?? false,
//         endCursor: posts.pageInfo.endCursor ?? null,
//       }));
//     }
//   });

//   const handleLoadMore = useCallback(() => {
//     if (!hasMore) {
//       const previousDate = getPreviousDate(currentDate);
//       setHeading(previousDate);
//       fetchMore({
//         variables: {
//           "first": 10,
//           "postedAfter": previousDate, // 26th March 2024
//           // "postedBefore": currentDate, // 27th March 2024
//           "after": endCursor
//         },
//         updateQuery: (prev, { fetchMoreResult }) => {
//           if (!fetchMoreResult) {
//             return prev;
//           }
//           const { posts } = fetchMoreResult;
//           setPostState((prev) => ({
//             postsList: [...prev.postsList, ...posts.nodes],
//             hasMore: posts.pageInfo.hasNextPage,
//             endCursor: posts.pageInfo.endCursor
//           }));
//           return {
//             posts: {
//               ...posts,
//               nodes: [...prev.posts.nodes, ...posts.nodes],
//               pageInfo: posts.pageInfo
//             }
//           };
//         }
//       });
//     }
//     if (hasMore) {
//       fetchMore({
//         variables: {
//           "after": endCursor
//         },
//         updateQuery: (prev, { fetchMoreResult }) => {
//           if (!fetchMoreResult) {
//             return prev;
//           }
//           const { posts } = fetchMoreResult;
//           setPostState((prev) => ({
//             postsList: [...prev.postsList, ...posts.nodes],
//             hasMore: posts.pageInfo.hasNextPage,
//             endCursor: posts.pageInfo.endCursor
//           }));
//           return {
//             posts: {
//               ...posts,
//               nodes: [...prev.posts.nodes, ...posts.nodes],
//               pageInfo: posts.pageInfo
//             }
//           };
//         }
//       });
//     }
//   }, [endCursor, fetchMore, hasMore]);

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div>
//       <div className="heading">
//         <p className="title">Top Products Launching Today {heading}</p>
//         <div className="button-group">
//           <NavLink to="/" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>Featured</NavLink>
//           <span>|</span>
//           <NavLink to="/all" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>All</NavLink>
//         </div>
//       </div>
//       <InfiniteScroll
//         className="posts-container"
//         loadMore={handleLoadMore}
//         hasMore={hasMore}
//         loader={<CircularProgress />}
//         threshold={50}
//         initialLoad={false}>
//         {postsList.map(post => <PostCard key={post.id} post={post} />)}
//       </InfiniteScroll>
//     </div>
//   )
// }

// export default InfinitePostsViewer;

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
      "postedAfter": heading,
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
    return <p>Error: {error.message}</p>;
  }

  console.log(Object.entries(groupedPosts));

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
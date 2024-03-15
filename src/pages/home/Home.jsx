import { useQuery } from "@apollo/client"
import { NavLink } from 'react-router-dom';
import { GET_FEATURED_POSTS } from "../../graphql/queries";
import TopLaunches from "../../components/home/top-launches/TopLaunches";
import PostCard from "../../components/common/post-card/PostCard";
import "./Home.scss";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

const Home = ({ featured }) => {

  const [postsData, setPostsData] = useState([]);
  const [endCursor, setEndCursor] = useState(null);

  const { data, error, loading, fetchMore } = useQuery(GET_FEATURED_POSTS, {
    variables: {
      "first": 10,
      "featured": featured,
      "order": "RANKING",
      "after": endCursor
    },
    keepPreviousData: true
  });

  const { posts: { pageInfo: { hasNextPage } = {} } = {} } = data || {};

  useEffect(() => {
    fetchMore({
      variables: {
        "first": 10,
        "featured": true,
        "order": "RANKING",
        "after": endCursor
      },
    }).then(newData => {
      setPostsData(newData.data.posts.nodes);
      setEndCursor(newData.data.posts.pageInfo.endCursor);
    });
  }, []);


  const handleLoadMore = () => {
    if (!loading && data && data.posts && data.posts.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          "first": 10,
          "featured": true,
          "order": "RANKING",
          "after": endCursor
        }
      }).then(newData => {
        setPostsData([...postsData, ...newData.data.posts.nodes]);
        setEndCursor(newData.data.posts.pageInfo.endCursor);
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
            <NavLink to="all" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>All</NavLink>
          </div>
        </div>
        <InfiniteScroll
          className="posts-container"
          loadMore={handleLoadMore}
          hasMore={hasNextPage}
          loader={<div>loading...</div>}
          threshold={50}
          initialLoad={false}>
          {postsData.map(post => <PostCard key={post.id} post={post} />)}
        </InfiniteScroll>
      </div>
      <TopLaunches />
    </>
  )
}

export default Home;

Home.propTypes = {
  featured: PropTypes.bool.isRequired
}
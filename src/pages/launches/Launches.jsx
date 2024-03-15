import { NavLink, useLocation } from "react-router-dom"
import "./Launches.scss";
import { days, years } from "../../utils/constants";
import PostCard from "../../components/common/post-card/PostCard";
import { useQuery } from "@apollo/client";
import { GET_FEATURED_POSTS } from "../../graphql/queries";

const Launches = () => {

  const location = useLocation();
  console.log('location', location.pathname);

  const { data, error, loading } = useQuery(GET_FEATURED_POSTS, {
    variables: {
      "first": 15,
      "featured": true,
      "order": "RANKING"
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  const { nodes: allPosts } = data.posts;

  return (
    <>
      <div className="launches-container">
        <div className="launches-heading">
          <div className="heading-text">Best of March 12, 2024</div>
          <div className="routes">
            <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to="/leaderboard/daily/2024/3/15">Daily</NavLink>
            <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to="/leaderboard/weekly/2024/1">Weekly</NavLink>
            <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to="/leaderboard/monthly/2024/3">Monthly</NavLink>
            <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to="/leaderboard/yearly/2024">Yearly</NavLink>
          </div>
          <div className="button-group">
            <NavLink to={`${location.pathname}`} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>Featured</NavLink>
            <span>|</span>
            <NavLink to={`${location.pathname}/all`} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>All</NavLink>
          </div>
        </div>
        <div className="pagination">
          {days.map((day, index) => {
            return (
              <div key={index}>
                <NavLink to={`/leaderboard/daily/${day}`} className={({ isActive }) => isActive ? "day selected" : "day"}>{day}</NavLink>
              </div>
            );
          })}
        </div>
        <div className="posts-list">
          {allPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
      <div className="launch-archive">
        <p className="launch-archive-heading">LAUNCH ARCHIVE</p>
        <div className="archive-list">
          {years.map((year, index) => {
            return (
              <div key={index} className="archive">
                <NavLink to={`/leaderboard/${year}`} className={({ isActive }) => isActive ? "archive-link active" : "archive-link"}>{year}</NavLink>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Launches
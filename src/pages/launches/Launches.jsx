import { NavLink, useLocation } from "react-router-dom"
import { PropTypes } from "prop-types";
import "./Launches.scss";
import { days, years } from "../../utils/constants";
import PostCard from "../../components/common/post-card/PostCard";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import CategoryProvider from "../../context/CategoryProvider";

const Launches = ({ featured }) => {

  const location = useLocation();
  // const navigate = useNavigate();
  // const { year, month, day } = useParams();

  console.log(location.pathname, 'featured :', featured);
  // console.log('featured :', featured)
  const { data, error, loading } = useQuery(GET_POSTS, {
    variables: {
      "first": 15,
      "featured": true,
      "order": "RANKING"
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { nodes: allPosts } = data.posts;

  return (
    <CategoryProvider>
      <div className="launches-container">
        <div className="launches-heading">
          <div className="heading-text">Best of March 12, 2024</div>
          <div className="routes">
            <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to={`/leaderboard/daily/2024/3/19`}>Daily</NavLink>
            <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to={`/leaderboard/weekly/2024/1`}>Weekly</NavLink>
            <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to={`/leaderboard/monthly/2024/3`}>Monthly</NavLink>
            <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to={`/leaderboard/yearly/2024`}>Yearly</NavLink>
          </div>
          <div className="button-group">
            <NavLink to="/leaderboard/daily/2024/3/19" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>Featured</NavLink>
            <span>|</span>
            <NavLink to="/leaderboard/daily/2024/3/19/all" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>All</NavLink>
          </div>
        </div>
        <div className="pagination">
          {days.map((day, index) => {
            return (
              <div key={index}>
                <NavLink to={`/leaderboard/daily/2024/3/${day}`} className={({ isActive }) => isActive ? "day selected" : "day"}>{day}</NavLink>
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
                <NavLink to={`/leaderboard/yearly/${year}`} className={({ isActive }) => isActive ? "archive-link active" : "archive-link"}>{year}</NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </CategoryProvider>
  )
}

export default Launches;

Launches.defaultProps = {
  featured: true
}

Launches.propTypes = {
  featured: PropTypes.bool
};
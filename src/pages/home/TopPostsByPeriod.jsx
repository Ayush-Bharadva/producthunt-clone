import { PropTypes } from 'prop-types';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../graphql/queries';
import { NavLink, useNavigate } from 'react-router-dom';
import PostCard from '../../components/common/post-card/PostCard';
// import { CircularProgress } from "@mui/material";

const TopPostsByPeriod = ({ featured, title, periodLabel, postedBefore, postedAfter }) => {

  const navigate = useNavigate();

  const { data, error } = useQuery(GET_POSTS, {
    variables: {
      "first": 5,
      "featured": !!featured,
      "order": "VOTES",
      "postedAfter": postedAfter,
      "postedBefore": postedBefore
    },
    keepPreviousData: true
  });

  const handleNavigation = () => {
    navigate(`/leaderboard/${periodLabel}`);
  };

  const { posts: { nodes: productsList } = {} } = data || {};
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="heading">
        <p className="title">{title}</p>
        <div className="button-group">
          <NavLink to={`/leaderboard/${periodLabel}`} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>Featured</NavLink>
          <span>|</span>
          <NavLink to={`/leaderboard/${periodLabel}/all`} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>All</NavLink>
        </div>
      </div>
      <div>
        {productsList?.map(post => <PostCard key={post.id} post={post} />)}
      </div>
      <button type="button" className="see-all-button" onClick={handleNavigation}>
        See all {title.toLowerCase()}
      </button>
    </>
  );
}

export default TopPostsByPeriod;

TopPostsByPeriod.propTypes = {
  featured: PropTypes.bool,
  title: PropTypes.string,
  periodLabel: PropTypes.string,
  postedBefore: PropTypes.string,
  postedAfter: PropTypes.string
};
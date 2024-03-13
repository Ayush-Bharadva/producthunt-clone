import { useQuery } from "@apollo/client"
// import { response } from "../../utils/res";
import { NavLink } from 'react-router-dom';
import { GET_POSTS } from "../../graphql/queries";
import TopLaunches from "../../components/home/top-launches/TopLaunches";
import PostCard from "../../components/common/post-card/PostCard";
import "./Home.scss";

const Home = () => {

  const { data, error, loading } = useQuery(GET_POSTS, {
    variables: {
      "first": 15,
      "featured": true,
      "order": "RANKING"
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  const allPosts = data.posts.nodes;

  return (
    <>
      <div className="main-container">
        <div className="home-container">
          <div className="heading">
            <p className="title">Top Products Launching Today</p>
            <div className="button-group">
              <NavLink to="/"><button type="button" className="text-button">Featured</button></NavLink>
              <span>|</span>
              <NavLink to="all"><button type="button" className="text-button">All</button></NavLink>
            </div>
          </div>
          <div className="products-container">
            {allPosts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        </div>
        <TopLaunches />
      </div>
    </>
  )
}

export default Home
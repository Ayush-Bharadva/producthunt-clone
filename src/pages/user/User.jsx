import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import "./User.scss";
import { GET_USER_DETAILS } from "../../graphql/queries";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ProductCard from "../../components/common/product-card/ProductCard";
import { showToast } from "../../utils/helper";

const User = () => {
  const [userInfo] = useLocalStorage("userInfo", null);
  const { id, name, headline, profileImage } = userInfo ?? {};

  const { data, error, loading } = useQuery(GET_USER_DETAILS, {
    variables: {
      username: userInfo.username
    }
  });

  const { votedPosts } = data?.user ?? {};

  if (error) {
    showToast("error", error.message);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="user-container">
      <div className="user-details-container">
        <div className="user-meta-info">
          <div className="user-avatar">
            <img src={profileImage} alt="user-avatar" />
          </div>
          <div className="user-details">
            <p className="user-name">{name}</p>
            <p className="user-headline">{headline}</p>
            <p className="user-id">#{id}</p>
          </div>
        </div>
        <div className="user-voted-posts">
          <p className="heading">RECENTLY SUPPORTED</p>
          {loading ? <CircularProgress /> :
            votedPosts?.nodes.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
};

export default User;
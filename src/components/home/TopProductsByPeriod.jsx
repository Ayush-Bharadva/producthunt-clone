import { PropTypes } from "prop-types";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { NavLink, useNavigate } from "react-router-dom";
import ProductCard from "../common/product-card/ProductCard";

const TopProductsByPeriod = ({ navPath, title, postedAfter, postedBefore }) => {

  const navigate = useNavigate();

  const { data, error } = useQuery(GET_POSTS, {
    variables: {
      "first": 5,
      "featured": true,
      "order": "VOTES",
      "postedAfter": postedAfter ?? null,
      "postedBefore": postedBefore ?? null
    }
  });

  const handleNavigation = () => {
    navigate(navPath);
  };

  const productsList = useMemo(() => data?.posts?.nodes || [], [data]);

  if (error) {
    <p>Error: {error.message}</p>;
  }

  return (
    <div className="period-wise-products">
      <div className="heading">
        <p className="title">{title}</p>
        <div className="button-group">
          <NavLink to={navPath} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>Featured</NavLink>
          <span>|</span>
          <NavLink to={`${navPath}/all`} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>All</NavLink>
        </div>
      </div>
      {productsList.length > 0 ?
        (<div>
          {productsList?.map(product => <ProductCard key={product.id} product={product} />)}
        </div>) :
        (<p>No Products found</p>)}
      <button className="see-all-button" onClick={handleNavigation}>
        See all {title.toLowerCase()}
      </button>
    </div>
  );
};

export default TopProductsByPeriod;

TopProductsByPeriod.propTypes = {
  navPath: PropTypes.string,
  title: PropTypes.string,
  postedAfter: PropTypes.string,
  postedBefore: PropTypes.string,
};
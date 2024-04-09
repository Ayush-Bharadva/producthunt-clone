import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { groupItemsByDate, showToast } from "../../../utils/helper";
import ProductCard from "../../common/product-card/ProductCard";
import { useFetchProducts } from "../../../hooks/useFetchProducts";
import Loader from "../../common/loader/Loader";

const isActiveLink = ({ isActive }) => isActive ? "category-btn active" : "category-btn";

const AllProducts = () => {

  const { productsList, error, hasMore, handleLoadMore } = useFetchProducts({
    order: "NEWEST",
  });

  const dateWisePosts = useMemo(() => groupItemsByDate(productsList), [productsList]);

  if (error) {
    showToast("error", error.message);
    return <p>Error: {error.message}</p>;
  }

  return (
    <InfiniteScroll
      className="posts-container"
      loadMore={handleLoadMore}
      hasMore={hasMore}
      loader={<Loader />}
      threshold={50}
      initialLoad={false}>
      {Object.entries(dateWisePosts).map(([date, posts]) => {
        return (
          <>
            <div className="heading">
              <p className="title">Products Launched on {date}</p>
              <div className="button-group">
                <NavLink to="/" className={isActiveLink}>Featured</NavLink>
                <span>|</span>
                <NavLink to="/all" className={isActiveLink}>All</NavLink>
              </div>
            </div>
            {posts.map(product => <ProductCard key={product.id} product={product} />)}
          </>
        );
      })}
    </InfiniteScroll>
  );
};

export default AllProducts;
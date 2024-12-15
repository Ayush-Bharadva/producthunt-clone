import InfiniteScroll from "react-infinite-scroller";
import { PropTypes } from "prop-types";
import "./Launches.scss";
import ProductCard from "../../components/common/product-card/ProductCard";
import DateSelector from "../../components/pages/launches/DateSelector";
import { getPostedDates } from "../../utils/helper";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const Launches = ({ isFeatured }) => {

  console.log("isFeatured", isFeatured);

  const { year, month, week, day } = useParams();

  const { startDate, endDate } = getPostedDates({ year, month, week, day });

  const { productsList, hasMore, error, loading, handleLoadMore } = useFetchProducts({
    featured: isFeatured,
    order: "VOTES",
    postedAfter: startDate,
    postedBefore: endDate
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <DateSelector />
      {loading ?
        <Loader /> :
        <InfiniteScroll
          className="posts-container"
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<Loader />}
          threshold={50}
          initialLoad={false}>
          {productsList.map(product => <ProductCard key={product.id} product={product} />)}
        </InfiniteScroll>}
      {!loading && !hasMore && productsList.length === 0 ? <p>No Products found</p> : null}
    </>
  );
};

export default Launches;

Launches.propTypes = {
  isFeatured: PropTypes.bool
};
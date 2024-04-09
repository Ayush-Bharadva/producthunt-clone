import InfiniteScroll from "react-infinite-scroller";
import "./Launches.scss";
import ProductCard from "../../components/common/product-card/ProductCard";
import DateSelector from "../../components/pages/launches/DateSelector";
import LaunchArchive from "../../components/pages/launches/LaunchArchive";
import { getPostedDates } from "../../utils/helper";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import LeaderBoardHeading from "../../components/pages/launches/LeaderBoardHeading";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const Launches = () => {

  const { year, month, week, day } = useParams();
  const location = useLocation();
  const routeType = location.pathname.split("/")[2];

  const { startDate, endDate } = getPostedDates({ year, month, week, day });

  const { productsList, hasMore, error, loading, handleLoadMore } = useFetchProducts({
    featured: true,
    order: "VOTES",
    postedAfter: startDate,
    postedBefore: endDate
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="launches-container">
        <LeaderBoardHeading year={year} month={month} day={day} type={routeType} />
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
      </div>
      <LaunchArchive type={routeType} />
    </>
  );
};

export default Launches;
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import "../../../pages/home/Home.scss";
import ProductCard from "../../common/product-card/ProductCard";
import { extractDateInfo, pstCurrentDate, showToast } from "../../../utils/helper";
import { useFetchProducts } from "../../../hooks/useFetchProducts";
import { ProductsTitle } from "../../../utils/constants";
import { lazy } from "react";
import Loader from "../../common/loader/Loader";

const TopProductsByPeriod = lazy(() => import("../../../components/pages/home/TopProductsByPeriod"));

const isActiveLink = ({ isActive }) => isActive ? "category-btn active" : "category-btn";

const { previousDate, previousWeekStartDate, previousWeekEndDate, previousMonthStartDate, previousMonthEndDate, weekNumber } = extractDateInfo(pstCurrentDate);

const FeaturedProducts = () => {

  const { productsList, hasMore, error, handleLoadMore } = useFetchProducts({
    featured: true,
    postedAfter: pstCurrentDate,
  });

  const [year, month, day] = previousDate.split("-");

  if (error) {
    showToast("error", error.message);
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="heading">
        <p className="title">Top Products Launching Today</p>
        <div className="button-group">
          <NavLink to="/" className={isActiveLink}>Featured</NavLink>
          <span>|</span>
          <NavLink to="/all" className={isActiveLink}>All</NavLink>
        </div>
      </div>
      <InfiniteScroll
        className="products-container"
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loader={<Loader />}
        threshold={50}
        initialLoad={false}>
        {productsList.map(product => <ProductCard key={product.id} product={product} />)}
      </InfiniteScroll>
      {!hasMore ?
        <>
          <TopProductsByPeriod
            title={ProductsTitle.yesterday}
            postedAfter={previousDate}
            postedBefore={pstCurrentDate}
            navPath={`/leaderboard/daily/${year}/${month}/${day}`}
          />
          <TopProductsByPeriod
            title={ProductsTitle.lastWeek}
            postedAfter={previousWeekStartDate}
            postedBefore={previousWeekEndDate}
            navPath={`/leaderboard/weekly/${year}/${weekNumber}`}
          />
          <TopProductsByPeriod
            title={ProductsTitle.lastMonth}
            postedAfter={previousMonthStartDate}
            postedBefore={previousMonthEndDate}
            navPath={`/leaderboard/monthly/${year}/${month}`}
          />
        </>
        : null}
    </>
  );
};

export default FeaturedProducts;
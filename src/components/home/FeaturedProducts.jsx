import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import "../../pages/home/Home.scss";
import ProductCard from "../common/product-card/ProductCard";
import { extractDateInfo, formatDate, pstCurrentDate, showToast } from "../../utils/helper";
import TopProductsByPeriod from "./TopProductsByPeriod";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { ProductsTitle } from "../../utils/constants";

const isActiveLink = ({ isActive }) => isActive ? "category-btn active" : "category-btn";

const FeaturedProducts = () => {

  const { productsList, hasMore, error, handleLoadMore } = useFetchProducts({
    featured: true,
    postedAfter: formatDate(pstCurrentDate),
  });

  const { previousDate, previousWeekStartDate, previousWeekEndDate, previousMonthStartDate, previousMonthEndDate, weekNumber } = extractDateInfo(pstCurrentDate);

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
        loader={<CircularProgress />}
        threshold={50}
        initialLoad={false}>
        {productsList.map(product => <ProductCard key={product.id} product={product} />)}
      </InfiniteScroll>
      {!hasMore ?
        <>
          <TopProductsByPeriod
            title={ProductsTitle.yesterday}
            postedAfter={previousDate}
            postedBefore={formatDate(pstCurrentDate)}
            navPath={`/leaderboard/daily/${year}/${month}/${day}`}
          />
          <TopProductsByPeriod
            title={ProductsTitle.lastWeek}
            postedAfter={formatDate(previousWeekStartDate)}
            postedBefore={formatDate(previousWeekEndDate)}
            navPath={`/leaderboard/weekly/${year}/${weekNumber}`}
          />
          <TopProductsByPeriod
            title={ProductsTitle.lastMonth}
            postedAfter={formatDate(previousMonthStartDate)}
            postedBefore={formatDate(previousMonthEndDate)}
            navPath={`/leaderboard/monthly/${year}/${month}`}
          />
        </>
        : null}
    </>
  );
};

export default FeaturedProducts;
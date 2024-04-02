import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import { subDays } from "date-fns";
import "./Home.scss";
import ProductCard from "../../components/common/product-card/ProductCard";
import { formatDate, getPreviousMonthDates, getPreviousWeekDates, pstCurrentDate, showToast } from "../../utils/helper";
import TopProductsByPeriod from "./TopProductsByPeriod";
import { eventType } from "../../utils/constants";
import { useFetchProducts } from "../../hooks/useFetchProducts";

const isActiveLink = ({ isActive }) => isActive ? "category-btn active" : "category-btn";

const [previousWeekStartDate, previousWeekEndDate] = getPreviousWeekDates(pstCurrentDate);
const [previousMonthStartDate, previousMonthEndDate] = getPreviousMonthDates(pstCurrentDate);

// console.log("pstCurrentDate", pstCurrentDate);

const FeaturedProducts = () => {

  const { productsList, hasMore, error, handleLoadMore } = useFetchProducts({
    featured: true,
    postedAfter: formatDate(pstCurrentDate),
  });

  if (error) {
    showToast("error", error.message);
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="heading">
        <p className="title">Top Products Launching on {formatDate(pstCurrentDate)}</p>
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
        {productsList.map(post => <ProductCard key={post.id} post={post} />)}
      </InfiniteScroll>
      {!hasMore ?
        <>
          <TopProductsByPeriod
            title="Yesterday's Top Products"
            // type={DurationType.daily}
            event={eventType.yesterday}
            postedAfter={formatDate(subDays(pstCurrentDate, 1))}
            postedBefore={formatDate(pstCurrentDate)}
          />
          <TopProductsByPeriod
            title="Last Week's Top Products"
            // type={DurationType.weekly}
            event={eventType.week}
            postedAfter={formatDate(previousWeekStartDate)}
            postedBefore={formatDate(previousWeekEndDate)}
          />
          <TopProductsByPeriod
            title="Last Month's Top Products"
            // type={DurationType.monthly}
            event={eventType.month}
            postedAfter={formatDate(previousMonthStartDate)}
            postedBefore={formatDate(previousMonthEndDate)}
          />
        </>
        : null}
    </>
  );
};

export default FeaturedProducts;
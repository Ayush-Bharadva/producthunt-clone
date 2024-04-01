import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@apollo/client";
import "./Home.scss";
import ProductCard from "../../components/common/product-card/ProductCard";
import { useCallback, useState } from "react";
import { GET_POSTS } from "../../graphql/queries";
import { convertToPST, formatDate, getPreviousMonthDates, getPreviousWeekDates, pstCurrentDate, showToast } from "../../utils/helper";
import TopProductsByPeriod from "./TopProductsByPeriod";
import { PeriodLabel } from "../../utils/constants";
import { subDays } from "date-fns";

const [previousWeekStartDate, previousWeekEndDate] = getPreviousWeekDates(pstCurrentDate);
const [previousMonthStartDate, previousMonthEndDate] = getPreviousMonthDates(pstCurrentDate);

const FeaturedProducts = () => {
  const [featuredProductsData, setFeaturedProductsData] = useState({
    featuredProductsList: [],
    endCursor: null,
    hasMore: true
  });

  const { featuredProductsList, endCursor, hasMore } = featuredProductsData;

  const { loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      "first": 10,
      "featured": true,
      "postedAfter": formatDate(pstCurrentDate),
      "after": null,
    },
    onCompleted: (data) => {
      const { posts } = data ?? {};
      setFeaturedProductsData({
        featuredProductsList: posts.nodes ?? [],
        hasMore: posts.pageInfo.hasNextPage ?? false,
        endCursor: posts.pageInfo.endCursor ?? null,
      });
    }
  });

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchMore({
        variables: {
          "after": endCursor
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const { posts } = fetchMoreResult;
          setFeaturedProductsData(prevState => ({
            featuredProductsList: [...prevState.featuredProductsList, ...posts.nodes],
            hasMore: posts.pageInfo.hasNextPage,
            endCursor: posts.pageInfo.endCursor
          }));
          return {
            posts: {
              ...posts,
              nodes: [...prev.posts.nodes, ...posts.nodes],
              pageInfo: posts.pageInfo
            }
          };
        }
      });
    }
  }, [endCursor, fetchMore, hasMore, loading]);

  if (error) {
    showToast("error", error.message);
    return <p>Error: {error.message}</p>;
  }

  // console.log('hasMore:', hasMore, "endCursor:", endCursor);
  // getPreviousWeekDates(pstCurrentDate);

  return (
    <>
      <div className="heading">
        <p className="title">Top Products Launching on {formatDate(pstCurrentDate)}</p>
        <div className="button-group">
          <NavLink to="/" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>Featured</NavLink>
          <span>|</span>
          <NavLink to="/all" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>All</NavLink>
        </div>
      </div>
      <InfiniteScroll
        className="products-container"
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loader={<CircularProgress />}
        threshold={50}
        initialLoad={false}>
        {featuredProductsList.map(post => <ProductCard key={post.id} post={post} />)}
      </InfiniteScroll>
      {!hasMore ?
        <>
          <TopProductsByPeriod
            title="Yesterday's Top Products"
            periodLabel={PeriodLabel.yesterday}
            postedAfter={formatDate(convertToPST(subDays(pstCurrentDate, 1)))}
            postedBefore={formatDate(pstCurrentDate)}
          />
          <TopProductsByPeriod
            title="Last Week's Top Products"
            periodLabel={PeriodLabel.weekly}
            postedAfter={formatDate(previousWeekStartDate)}
            postedBefore={formatDate(previousWeekEndDate)}
          />
          <TopProductsByPeriod
            title="Last Month's Top Products"
            periodLabel={PeriodLabel.monthly}
            postedAfter={formatDate(previousMonthStartDate)}
            postedBefore={formatDate(previousMonthEndDate)}
          />
        </>
        : null}
    </>
  );
};

export default FeaturedProducts;
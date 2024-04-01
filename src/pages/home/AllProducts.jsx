import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { GET_POSTS } from "../../graphql/queries";
import { groupItemsByDate, showToast } from "../../utils/helper";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import ProductCard from "../../components/common/product-card/ProductCard";

const AllProducts = () => {
  const [allProductsData, setAllProductsData] = useState({
    productsList: [],
    endCursor: null,
    hasMore: true
  });

  const { productsList, endCursor, hasMore } = allProductsData;

  const { loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: {
      "first": 10,
      "after": null,
      "order": "NEWEST"
    },
    onCompleted: (data) => {
      const { posts } = data ?? {};
      setAllProductsData({
        productsList: posts.nodes ?? [],
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
          setAllProductsData(prevState => ({
            ...prevState,
            productsList: [...prevState.productsList, ...posts.nodes],
            hasMore: posts.pageInfo.hasNextPage,
            endCursor: posts.pageInfo.endCursor
          }));
          return { fetchMoreResult };
        }
      });
    }
  }, [endCursor, fetchMore, hasMore, loading]);

  if (error) {
    showToast("error", error.message);
    return <p>Error: {error.message}</p>;
  }

  const dateWisePosts = groupItemsByDate(productsList);

  return (
    <>
      <InfiniteScroll
        className="posts-container"
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loader={<CircularProgress />}
        threshold={50}
        initialLoad={false}>
        {Object.entries(dateWisePosts).map(([date, posts]) => {
          return (
            <>
              <div className="heading">
                <p className="title">Top Products Launching on {date}</p>
                <div className="button-group">
                  <NavLink to="/" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>Featured</NavLink>
                  <span>|</span>
                  <NavLink to="/all" className={({ isActive }) => isActive ? "category-btn active" : "category-btn"}>All</NavLink>
                </div>
              </div>
              {posts.map(post => <ProductCard key={post.id} post={post} />)}
            </>
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default AllProducts;
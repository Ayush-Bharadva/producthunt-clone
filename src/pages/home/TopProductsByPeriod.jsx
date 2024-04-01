import { PropTypes } from "prop-types";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { NavLink, useNavigate } from "react-router-dom";
import ProductCard from "../../components/common/product-card/ProductCard";
import { subWeeks } from "date-fns";
import { getWeekNumberByDate } from "../../utils/helper";

const currentDate = new Date().toISOString();

const TopProductsByPeriod = ({ title, periodLabel, postedAfter, postedBefore }) => {

  console.log("postedAfter", postedAfter);
  console.log("postedBefore", postedBefore);

  const navigate = useNavigate();

  const [year, month, day] = postedAfter.split('-');

  const selectedDate = currentDate;
  const previousWeekNumber = getWeekNumberByDate(subWeeks(new Date(selectedDate), 1));

  const { data, error } = useQuery(GET_POSTS, {
    variables: {
      "first": 5,
      "featured": true,
      "order": "VOTES",
      "postedAfter": postedAfter || null,
      "postedBefore": postedBefore || null
    },
    keepPreviousData: true
  });

  let navigationPath = "";
  if (periodLabel === "Yesterday") {
    navigationPath = `/leaderboard/daily/${year}/${month}/${day}`;
  } else if (periodLabel === "Weekly") {
    navigationPath = `/leaderboard/weekly/${year}/${previousWeekNumber}`;
  } else if (periodLabel === "Monthly") {
    navigationPath = `/leaderboard/monthly/${year}/${month}`;
  }

  const handleNavigation = () => {
    navigate(navigationPath);
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
          <NavLink to={navigationPath} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>Featured</NavLink>
          <span>|</span>
          <NavLink to={`${navigationPath}/all`} className={({ isActive }) => isActive ? "category-btn active" : "category-btn"} end>All</NavLink>
        </div>
      </div>
      {productsList.length > 0 &&
        (<div>
          {productsList?.map(post => <ProductCard key={post.id} post={post} />)}
        </div>)}
      <button className="see-all-button" onClick={handleNavigation}>
        See all {title.toLowerCase()}
      </button>
    </div>
  );
};

export default TopProductsByPeriod;

TopProductsByPeriod.propTypes = {
  title: PropTypes.string,
  periodLabel: PropTypes.string,
  postedAfter: PropTypes.string,
  postedBefore: PropTypes.string,
};
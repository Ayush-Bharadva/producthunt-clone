import "./Home.scss";
import TopLaunches from "../../components/home/top-launches/TopLaunches";
import { PropTypes } from "prop-types";
import InfinitePostsViewer from "../../components/infinite-posts-scroller/InfinitePostScroller";

// const today = startOfToday();
const Home = () => {

  return (
    <>
      <div className="home-container">
        <InfinitePostsViewer />
        {/* {!hasMore ?
          <>
            <TopPostsByPeriod
              title="Yesterday's Top Products"
              periodLabel={PeriodLabel.yesterday}
            // featured={isFeaturedPosts}
            // filterAllPosts={filterAllPosts}
            // postedAfter={yesterdaysDate}
            // postedBefore={todaysDate}
            />
            <TopPostsByPeriod
              title="Last Week's Top Products"
              periodLabel={PeriodLabel.weekly}
            // featured={isFeaturedPosts}
            // filterAllPosts={filterAllPosts}
            // periodLabel={`weekly/${year}/${currentWeekNumber}`}
            // postedBefore="2024-03-17"
            // postedAfter="2024-03-11"
            />
            <TopPostsByPeriod
              title="Last Month's Top Products"
              periodLabel={PeriodLabel.monthly}
            // featured={isFeaturedPosts}
            // filterAllPosts={filterAllPosts}
            // periodLabel={`monthly/${year}/${month}`}
            // postedBefore="2024-03-20"
            // postedAfter="2024-03-1"
            />
          </>
          : null} */}
      </div>
      <TopLaunches />
    </>
  )
}

export default Home;

Home.propTypes = {
  featured: PropTypes.bool
};

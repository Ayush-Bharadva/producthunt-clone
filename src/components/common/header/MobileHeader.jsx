import { NavLink } from "react-router-dom";
import SearchInput from "../search-box/SearchInput";
import { FaAngleRight } from "react-icons/fa6";

const MobileHeader = () => {
  return (
    <div className="mobile-header">
      <SearchInput />
      <nav className="mobile-header-nav">
        <div className="mobile-header-link">
          <NavLink to="leaderboard">Launches</NavLink>
          <FaAngleRight />
        </div>
        <div className="mobile-header-link">
          <NavLink to="products">Products</NavLink>
          <FaAngleRight />
        </div>
        <div className="mobile-header-link">
          <NavLink to="news">News</NavLink>
          <FaAngleRight />
        </div>
        <div className="mobile-header-link">
          <NavLink to="community">Community</NavLink>
          <FaAngleRight />
        </div>
        <div className="mobile-header-link">
          <NavLink to="advertise">Advertise</NavLink>
        </div>
      </nav>
    </div>
  )
}

export default MobileHeader
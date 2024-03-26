import { NavLink } from "react-router-dom";
import SearchInput from "../search-box/SearchInput";
import { FaAngleRight } from "react-icons/fa6";

const MobileNavigationMenu = () => {
  return (
    <div className="mobile-navigation-menu">
      <SearchInput />
      <nav className="mobile-nav">
        <div className="nav-link">
          <NavLink to="leaderboard">Launches</NavLink>
          <FaAngleRight />
        </div>
        <div className="nav-link">
          <NavLink to="products">Products</NavLink>
          <FaAngleRight />
        </div>
        <div className="nav-link">
          <NavLink to="news">News</NavLink>
          <FaAngleRight />
        </div>
        <div className="nav-link">
          <NavLink to="community">Community</NavLink>
          <FaAngleRight />
        </div>
        <div className="nav-link">
          <NavLink to="advertise">Advertise</NavLink>
        </div>
      </nav>
    </div>
  )
}

export default MobileNavigationMenu
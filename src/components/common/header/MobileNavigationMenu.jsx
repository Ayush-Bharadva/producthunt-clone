import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import SearchInput from "../search-input/SearchInput";
import { FaAngleRight } from "react-icons/fa6";
import { useEffect } from "react";

const MobileNavigationMenu = ({ isMenuOpen }) => {

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  return isMenuOpen ? (
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
  ) : null;
}

export default MobileNavigationMenu;

MobileNavigationMenu.propTypes = {
  isMenuOpen: PropTypes.bool
};
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FaAngleRight } from "react-icons/fa6";
import SearchInput from "../search-input/SearchInput";

const MobileNavigationMenu = ({ isMenuOpen, closeMenu }) => {

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
          <NavLink to="leaderboard/daily/2024/4/2" onClick={closeMenu}>Launches</NavLink>
          <FaAngleRight />
        </div>
        <div className="nav-link">
          <NavLink to="products" onClick={closeMenu}>Products</NavLink>
          <FaAngleRight />
        </div>
        <div className="nav-link">
          <NavLink to="news" onClick={closeMenu}>News</NavLink>
          <FaAngleRight />
        </div>
        <div className="nav-link">
          <NavLink to="community" onClick={closeMenu}>Community</NavLink>
          <FaAngleRight />
        </div>
        <div className="nav-link">
          <NavLink to="advertise" onClick={closeMenu}>Advertise</NavLink>
        </div>
      </nav>
    </div>
  ) : null;
};

export default MobileNavigationMenu;

MobileNavigationMenu.propTypes = {
  isMenuOpen: PropTypes.bool,
  closeMenu: PropTypes.func
};
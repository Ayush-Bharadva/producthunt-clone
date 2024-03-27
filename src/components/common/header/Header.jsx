// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.scss";
import Logo from "./../logo/Logo";
import SearchInput from "../search-input/SearchInput";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import MobileNavigationMenu from "./MobileNavigationMenu";

const isActiveLink = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleHeader = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header className="header">
        <div className="left">
          {!isMenuOpen ?
            <RxHamburgerMenu className="hamburger-menu" onClick={toggleHeader} /> :
            <IoClose className="close-header" onClick={toggleHeader} />}
          <Logo />
          <SearchInput />
        </div>
        <nav className="navbar">
          <ul className="navbar-links" >
            <NavLink to="/leaderboard/daily/2024/3/21" className={isActiveLink}>Launches</NavLink>
            <NavLink to="/products" className={isActiveLink}>Products</NavLink>
            <NavLink to="/news" className={isActiveLink}>News</NavLink>
            <NavLink to="/community" className={isActiveLink}>Community</NavLink>
            <NavLink to="/advertise" className={isActiveLink}>Advertise</NavLink>
          </ul>
        </nav>
        <div className="right">
          <button type="button" className="text-button">How to post?</button>
          <UserProfileButton />
        </div>
      </header>
      <MobileNavigationMenu isMenuOpen={isMenuOpen} />
    </>
  )
}

export default Header;

const UserProfileButton = () => {

  return (
    <Link to="https://api.producthunt.com/v2/oauth/authorize?client_id=39zsVF6R_8mbajaavFpoNkEHlqNTfw6IFgM5d2OpvhU&redirect_uri=https://producthunt-clone-5173.netlify.app:3000&response_type=code&scope=public+private">
      <button type="button" className="sign-in-btn">
        Sign In
      </button>
    </Link>
  );
};

UserProfileButton.propTypes = {
  userProfile: PropTypes.object,
  logOut: PropTypes.func,
  login: PropTypes.func,
};
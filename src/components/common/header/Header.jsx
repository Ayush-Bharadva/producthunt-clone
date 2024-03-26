import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.scss";
import Logo from "./../logo/Logo";
import SearchInput from "../search-box/SearchInput";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import MobileNavigationMenu from "./MobileNavigationMenu";
import { AuthContext } from "../../../context/AuthProvider";

const Header = () => {

  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const { login, logOut } = useContext(AuthContext);
  const userProfile = JSON.parse(localStorage.getItem("profile"));

  const toggleHeader = () => {
    setIsHeaderOpen(!isHeaderOpen);
  }

  useEffect(() => {
    if (isHeaderOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isHeaderOpen]);

  const isActiveLink = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

  console.log("userProfile", userProfile);

  return (
    <>
      <header className="header">
        <div className="left">
          {!isHeaderOpen ?
            <RxHamburgerMenu className="hamburger-menu" onClick={toggleHeader} /> :
            <IoClose className="close-header" onClick={toggleHeader} />}
          <Logo />
          <SearchInput />
        </div>
        <nav className={isHeaderOpen ? "navbar" : "navbar"}>
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
          <UserProfileButton userProfile={userProfile} logOut={logOut} login={login} />
        </div>
      </header>
      {isHeaderOpen && <MobileNavigationMenu />}
    </>
  )
}

export default Header;

const UserProfileButton = ({ userProfile, logOut, login }) => {
  return userProfile.picture ?
    <>
      <div className="user-avatar">
        <img src={userProfile?.picture} alt="user-avatar" />
      </div>
      <button type="button" className="sign-in-btn" onClick={logOut}>Log Out</button>
    </>
    :
    <button type="button" className="sign-in-btn" onClick={login}>Sign In</button>;
};

UserProfileButton.propTypes = {
  userProfile: PropTypes.object,
  logOut: PropTypes.func,
  login: PropTypes.func,
};
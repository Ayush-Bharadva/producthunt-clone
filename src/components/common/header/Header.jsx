import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.scss";
import Logo from "./../logo/Logo";
import SearchInput from "../search-input/SearchInput";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
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

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed :", error),
  });

  useEffect(() => {
    if (user) {
      fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          "Authorization": `Bearer ${user.access_token}`,
          "Accept": "application/json"
        }
      }).then((response) => response.json()).then((data) => {
        setProfile(data);
        localStorage.setItem("profile", JSON.stringify(data));
      }).catch((error) => console.log("Error: ", error));
    }
  }, [user])

  const navigateToUserProfile = () => {
    navigate("/user");
  }

  const logOut = useCallback(() => {
    googleLogout();
    setUser(null);
    setProfile(null);
    localStorage.removeItem("profile");
  }, []);

  return profile?.picture ?
    <>
      <div className="user-avatar" onClick={navigateToUserProfile}>
        <img src={profile.picture} alt="user-avatar" />
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
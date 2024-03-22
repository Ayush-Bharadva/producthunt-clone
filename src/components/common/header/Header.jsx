import { NavLink } from "react-router-dom";
import "./Header.scss";
import Logo from "./../logo/Logo";
import SearchInput from "../search-box/SearchInput";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import MobileHeader from "./MobileHeader";

const Header = () => {

  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const toggleHeader = () => {
    setIsHeaderOpen(!isHeaderOpen);
  }

  const isActiveLink = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

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
        <nav className="navbar" >
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
          <button type="button" className="sign-in-btn">Sign in</button>
        </div>
      </header>
      {isHeaderOpen && <MobileHeader />}
    </>
  )
}

export default Header
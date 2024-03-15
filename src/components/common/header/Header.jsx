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
            <NavLink to="leaderboard/daily/2024/3/15" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Launches</NavLink>
            <NavLink to="products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink>
            <NavLink to="news" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>News</NavLink>
            <NavLink to="community" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Community</NavLink>
            <NavLink to="advertise" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Advertise</NavLink>
          </ul>
        </nav>
        <div className="right">
          <button type="button" className="text-button">How to post?</button>
          <button type="button" className="sign-in-btn">Sign in</button>
        </div>
      </header>
      {
        isHeaderOpen && <MobileHeader />
      }
    </>
  )
}

export default Header
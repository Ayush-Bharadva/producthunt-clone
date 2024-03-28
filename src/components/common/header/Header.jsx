import { NavLink } from "react-router-dom";
import "./Header.scss";
import Logo from "./../logo/Logo";
import SearchInput from "../search-input/SearchInput";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import MobileNavigationMenu from "./MobileNavigationMenu";
import UserActions from "./UserActions";

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
        <UserActions key={Math.random} />
      </header>
      <MobileNavigationMenu isMenuOpen={isMenuOpen} />
    </>
  )
}

export default Header;
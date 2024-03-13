import { NavLink } from "react-router-dom";
import "./Header.scss";
import Logo from './../logo/Logo';
import SearchInput from "../search-box/SearchInput";

const Header = () => {
  return (
    <header className="header">
      <div className="left">
        <Logo />
        <SearchInput />
      </div>
      <nav className="navbar" >
        <ul className="navbar-links" >
          <NavLink to="leaderboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Launches</NavLink>
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
  )
}

export default Header
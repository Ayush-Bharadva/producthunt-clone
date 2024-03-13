import { NavLink } from "react-router-dom";
import PhLogo from "../../../assets/product-hunt.svg";
import "./Logo.scss";

const Logo = () => {
  return (
    <NavLink to="/" className="logo">
      <img src={PhLogo} alt="Ph Logo" />
    </NavLink>
  )
}

export default Logo
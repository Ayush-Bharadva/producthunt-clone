import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { PropTypes } from "prop-types";
import "./Header.scss";
import { UserContext } from "../../../context/UserProvider";

const UserActions = () => {

  const { userInfo } = useContext(UserContext);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div className="right">
      {userInfo ?
        <>
          <button type="button" className="submit-btn">Submit</button>
          <div className="profile-avatar-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={userInfo.profileImage} alt="profile-avatar" />
          </div>
          {isHovering ? <ProfileMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /> : null}
        </> :
        <>
          <button type="button" className="text-button">How to Post</button>
          <Link to="https://api.producthunt.com/v2/oauth/authorize?client_id=39zsVF6R_8mbajaavFpoNkEHlqNTfw6IFgM5d2OpvhU&redirect_uri=https://clone-producthunt-5173.netlify.app&response_type=code&scope=public+private">
            <button type="button" className="sign-in-btn">
              Sign In
            </button>
          </Link>
        </>}
    </div>
  );
};

export default UserActions;

const ProfileMenu = (props) => {

  const { logoutUser } = useContext(UserContext);

  return (
    <div className="hover-menu-wrapper" {...props}>
      <menu className="hover-menu">
        <div className="menu-item">
          <NavLink to="/user">Profile</NavLink>
        </div>
        <div className="menu-item">
          <NavLink to="/" className="text-button" onClick={logoutUser}>Logout</NavLink>
        </div>
      </menu>
    </div>
  );
};

ProfileMenu.propTypes = {
  logOutUser: PropTypes.func
};
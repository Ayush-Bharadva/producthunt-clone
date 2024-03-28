import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { getAccessToken, getUserName } from "../../../services/auth-service";
import { showToast } from "../../../utils/helper";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries";
import { CircularProgress } from "@mui/material";
import "./Header.scss";

const UserActions = () => {

  const [code, setCode] = useState(null);
  const [username, setUsername] = useState(null);
  const [user, setUser] = useLocalStorage("user", null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isHovering, setIsHovering] = useState(true);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleUserAuth = useCallback(async (authCode) => {
    try {
      const { access_token } = await getAccessToken(authCode);
      const { data: { viewer: { user: { username = "" } = {} } = {} } = {} } = await getUserName(access_token);
      setUsername(username);
    } catch (error) {
      showToast("error", "failed to authenticate user");
    }
  }, []);

  const [getUserDetails, { loading }] = useLazyQuery(GET_USER, {
    variables: { username },
    onCompleted: (data) => {
      setUser(data.user);
      searchParams.delete("code");
      setSearchParams(searchParams);
    },
    onError: (error) => {
      showToast("error", error.message);
      console.error("Error in getUserDetails:", error);
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("code");
    if (codeParam) {
      setCode(codeParam);
    }
  }, []);

  useEffect(() => {
    if (code) {
      handleUserAuth(code);
      setCode(null);
    }
  }, [code, handleUserAuth]);

  useEffect(() => {
    if (username) {
      getUserDetails();
    }
  }, [username, getUserDetails]);

  if (loading) {
    return <div><CircularProgress /></div>;
  }

  const logOutUser = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="right">
      {
        user ?
          <>
            <button type="button" className="submit-btn">Submit</button>
            <div className="profile-avatar-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <img src={user?.profileImage} alt="profile-avatar" />
            </div>
            {isHovering ? <HoverMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} logOutUser={logOutUser} /> : null}
          </> :
          <>
            <button type="button" className="text-button">How to Post</button>
            <Link to="https://api.producthunt.com/v2/oauth/authorize?client_id=39zsVF6R_8mbajaavFpoNkEHlqNTfw6IFgM5d2OpvhU&redirect_uri=https://producthunt-clone-5173.netlify.app:3000&response_type=code&scope=public+private">
              <button type="button" className="sign-in-btn">
                Sign In
              </button>
            </Link>
          </>
      }
    </div>
  )
}

export default UserActions;

const HoverMenu = ({ logOutUser, ...props }) => {
  return (
    <div className="hover-menu-wrapper" {...props}>
      <menu className="hover-menu">
        <div className="menu-item">
          <NavLink to="/user">Profile</NavLink>
        </div>
        <div className="menu-item">
          <NavLink to="/" className="text-button" onClick={logOutUser}>LogOut</NavLink>
        </div>
      </menu>
    </div>
  );
}

HoverMenu.propTypes = {
  logOutUser: PropTypes.func
}
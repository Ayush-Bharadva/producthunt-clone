import { createContext, useCallback, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { showToast } from "../utils/helper";
import { getAccessToken, getUserName } from "../services/auth-service";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const UserContext = createContext({
  userInfo: null,
  username: null,
  setUserInfo: () => { },
  handleUserAuth: () => { },
  handleUserLogout: () => { },
});

const UserProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useLocalStorage(null);

  const handleUserAuth = useCallback(async () => {
    try {
      const { access_token } = await getAccessToken(searchParams.get("code"));
      const { data: { viewer: { user: { username = "" } = {} } = {} } = {} } = await getUserName(access_token);
      setUserInfo({ username });
      setUsername(username);
      searchParams.delete("code");
      setSearchParams(searchParams);
    } catch (error) {
      showToast("error", "User authentication failed");
    }
  }, [searchParams, setSearchParams, setUsername]);

  const handleUserLogout = useCallback(() => {
    setUserInfo(null);
  }, []);


  useEffect(() => {
    if (searchParams.get("code")) {
      handleUserAuth();
    }
  }, [searchParams, handleUserAuth]);

  const ctxValue = {
    userInfo,
    username,
    setUserInfo,
    handleUserAuth,
    handleUserLogout
  };

  return (
    <UserContext.Provider value={ctxValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
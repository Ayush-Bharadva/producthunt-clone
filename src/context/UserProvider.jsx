import { createContext, useCallback, useEffect } from "react";
import { PropTypes } from "prop-types";
import { showToast } from "../utils/helper";
import { getAccessToken, getUserName } from "../services/auth-service";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

export const UserContext = createContext({
  userInfo: null,
  logoutUser: () => { },
});

const UserProvider = ({ children }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useLocalStorage("username", null);
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null);

  const authenticateUser = useCallback(async () => {
    try {
      const { access_token } = await getAccessToken(searchParams.get("code"));
      const { data } = await getUserName(access_token);

      const username = data?.viewer?.user?.username;

      setUsername(username);
      searchParams.delete("code");
      setSearchParams(searchParams);
    } catch (error) {
      showToast("error", error.message);
    }
  }, [searchParams, setSearchParams, setUsername]);

  const logoutUser = useCallback(() => {
    setUserInfo(null);
    setUsername(null);
  }, [setUserInfo, setUsername]);

  const [getUserDetails] = useLazyQuery(GET_USER, {
    variables: { username: username },
    onCompleted: (data) => {
      setUserInfo(data.user);
      searchParams.delete("code");
      setSearchParams(searchParams);
    },
    onError: (error) => {
      showToast("error", error.message);
    }
  });

  useEffect(() => {
    if (searchParams.get("code")) {
      authenticateUser();
    }
  }, [searchParams, authenticateUser]);

  useEffect(() => {
    if (username) {
      getUserDetails();
    }
  }, [getUserDetails, username]);

  const ctxValue = {
    userInfo,
    logoutUser
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
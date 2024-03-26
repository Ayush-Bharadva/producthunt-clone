import { createContext, useEffect, useState } from "react"
import { PropTypes } from "prop-types";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

export const AuthContext = createContext({
  user: [],
  profile: [],
  login: () => { },
  logOut: () => { }
});

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  console.log('user :', user, 'profile :', profile)

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

  const logOut = () => {
    googleLogout();
    setUser([]);
    setProfile([]);
    localStorage.removeItem("profile");
  }

  const ctxValue = {
    user,
    profile,
    login,
    logOut
  };

  return (
    <AuthContext.Provider value={ctxValue} >{children}</AuthContext.Provider>
  )
}

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
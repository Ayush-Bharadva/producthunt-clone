import { Outlet, useSearchParams } from "react-router-dom"
import Header from "../common/header/Header"
import { useEffect } from "react";
import { getUserAccessToken } from "../../utils/helper";

const Layout = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get("code");
  console.log('code :', code);

  useEffect(() => {
    async function getAccessToken(code) {
      const { access_token } = await getUserAccessToken(code);
      console.log('access_token :', access_token);
      if (access_token) {
        localStorage.setItem("token", access_token);
      }
    }
    if (code) {
      getAccessToken(code);
    }
  }, [code])

  return (
    <>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
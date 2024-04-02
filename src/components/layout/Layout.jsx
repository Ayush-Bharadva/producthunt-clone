import { Outlet } from "react-router-dom";
import Header from "../common/header/Header";
import UserProvider from "../../context/UserProvider";

const Layout = () => {

  return (
    <UserProvider>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </UserProvider>
  );
};

export default Layout;
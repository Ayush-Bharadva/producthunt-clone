import { Outlet } from "react-router-dom";
import Header from "../common/header/Header";
import UserProvider from "../../context/UserProvider";
import UpScrollButton from './../common/UpScrollButton';

const Layout = () => {

  return (
    <UserProvider>
      <Header />
      <main className="main-container">
        <Outlet />
        <UpScrollButton />
      </main>
    </UserProvider>
  );
};

export default Layout;
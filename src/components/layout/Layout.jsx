import { Outlet } from "react-router-dom"
import Header from "../common/header/Header"

const Layout = () => {
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
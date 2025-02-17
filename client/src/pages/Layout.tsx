import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import NavBar from "../components/NavBar.tsx";
import style from "../styles/Layout.module.css";

function Layout() {
  return (
    <section className={style.layout}>
      <Header />
      <NavBar />
      <main className={style.mainLayout}>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default Layout;

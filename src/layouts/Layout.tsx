import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  return (
    <>
      <Header />
      <main className="container px-12 sm:px-48 py-16">
        <Outlet />
      </main>
    </>
  );
}

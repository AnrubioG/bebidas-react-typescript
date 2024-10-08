import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

export function Layout() {
  const loadStorage = useAppStore((state) => state.loadStorage);

  useEffect(() => {
    loadStorage();
  }, []);
  return (
    <>
      <Header />
      <main className="container mx-auto py-16">
        <Outlet />
      </main>

      <Modal />
    </>
  );
}

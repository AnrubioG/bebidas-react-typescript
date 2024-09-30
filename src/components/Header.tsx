import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  return (
    <header className="bg-slate-900">
      <div className="mx-auto px-5 py-16 container">
        <div className="flex justify-between items-center">
          <div className="">
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>
          <nav className=" flex gap-4 uppercase font-bold">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white"
              }
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white"
              }
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6 ">
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o ingrediente. Ej. vodka, Tequila, Café"
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="text-white uppercase font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
              >
                <option>---Seleccione</option>
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white w-full p-2 rounded-lg uppercase font-extrabold"
            />
          </form>
        )}
      </div>
    </header>
  );
}

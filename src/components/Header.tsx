import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const categories = useAppStore((state) => state.categories);
  const showNotification = useAppStore((state) => state.showNotification);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validar campos
    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "All fields are required",
        error: true,
      });
      return;
    }

    // consultar la receta
    searchRecipes(searchFilters);
  };

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-900"}
    >
      <div className="mx-auto px-12 sm:px-16 py-16 container">
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
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white"
              }
              to="/favoritos"
            >
              Favorites
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6 "
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="text-white uppercase font-extrabold text-lg"
              >
                Name or Ingredients
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Name or ingredient. Example: vodka, Tequila, Coffee."
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="text-white uppercase font-extrabold text-lg"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option>--- Select ---</option>
                {categories.drinks.map((category) => (
                  <option
                    value={category.strCategory}
                    key={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Search Recipes"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white w-full p-2 rounded-lg uppercase font-extrabold"
            />
          </form>
        )}
      </div>
    </header>
  );
}

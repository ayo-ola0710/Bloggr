import { sidebarLinks } from "@/constants";
import { useNavigate, useLocation } from "react-router-dom";
import useTheme from "@/hooks/useTheme";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <main className="border-r pt-15 space-y-12 w-60 ml-4 pr-5 hidden md:block  ">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <button
            key={link.label}
            onClick={() => handleNavigation(link.route)}
            className={`flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-200 hover:cursor-pointer hover:scale-105 hover:rounded-2xl text-2xl font-bold w-full text-left ${
              isActive ? "bg-blue-100 border-l-4 border-blue-500" : ""
            }`}
          >
            <img src={link.imgURL} alt={link.label} />
            <p
              className={`${isActive ? "text-blue-600" : ""} ${
                theme === "light" ? "" : "text-white"
              }`}
            >
              {link.label}
            </p>
          </button>
        );
      })}
    </main>
  );
};

export default Sidebar;

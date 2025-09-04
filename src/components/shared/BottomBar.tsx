import { useNavigate, useLocation } from "react-router-dom";
import { bottombarLinks } from "@/constants";

const BottomBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="md:hidden flex justify-between  w-full bg-blue-500 border-t-2 border-blue-500  pb-1 px-3 fixed bottom-0 left-0 right-0">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <button
            key={link.label}
            onClick={() => handleNavigation(link.route)}
            className={` p-2 rounded-2xl hover:bg-gray-200 hover:cursor-pointer hover:scale-105 hover:rounded-2xl font-bold  ${
              isActive ? "bg-blue-100 border-t-4 border-blue-500" : ""
            }`}
          >
            <div className="text-sm flex flex-col items-center ">
              <img src={link.imgURL} alt={link.label} height={30} width={30} />
              <p className={isActive ? "text-blue-600" : ""}>{link.label}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BottomBar;

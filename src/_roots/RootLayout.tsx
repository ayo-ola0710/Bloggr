import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import BottomBar from "@/components/shared/BottomBar";
import { Outlet } from "react-router-dom";
import useTheme from "@/hooks/useTheme";

const RootLayout = () => {
  const { theme } = useTheme();

  return (
    <>
      <main className={`${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
        <Navbar />
        <div className="md:flex h-[calc(100vh-4rem)] md:overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
          <BottomBar />
        </div>
      </main>
    </>
  );
};

export default RootLayout;

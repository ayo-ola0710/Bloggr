import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
// import BottomBar from "@/components/shared/BottomBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <main>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        {/* <BottomBar /> */}
      </main>
    </>
  );
};

export default RootLayout;

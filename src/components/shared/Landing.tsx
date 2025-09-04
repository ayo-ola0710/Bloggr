import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import useTheme from "@/hooks/useTheme";
import { useThemeChange } from "@/hooks/ThemeChange";

const Landing = () => {
  const { theme } = useTheme();

  const themechanger = useThemeChange();
  return (
    <div
      className={`text-center pt-60 space-y-5 pb-65 ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      {themechanger}
      <p
        className={`text-5xl font-bold ${
          theme === "light" ? "" : "text-white"
        }`}
      >
        Welcome to Bloggr
      </p>
      <p className={`text-xl ${theme === "light" ? "" : "text-white"}`}>
        Home of Blogs for you
      </p>
      <div className="space-x-9">
        <Button className="md:px-8 md:py-3 hover:scale-105 ml-10 md:ml-0">
          <Link to={"/signin"}>Signin</Link>
        </Button>
        <Button className="md:px-8 md:py-3 hover:scale-105">
          <Link to={"/signup"}>Signup</Link>
        </Button>
      </div>
    </div>
  );
};

export default Landing;

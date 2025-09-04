import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useThemeChange } from "@/hooks/ThemeChange";
import useTheme from "@/hooks/useTheme";

const Navbar = () => {
  const isAuthenticated = false;

  const themeChangeButtton = useThemeChange();
  const { theme } = useTheme();

  return (
    <main
      className={`flex justify-between p-3 border-b px-10 ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="flex gap-2 items-center">
        <span
          className={`text-3xl font-bold ${
            theme === "light" ? "" : "text-white"
          }`}
        >
          B
        </span>
        <p
          className={`text-2xl font-bold ${
            theme === "light" ? "" : "text-white"
          }`}
        >
          Bloggr
        </p>
      </div>
      <div className="flex gap-6">
        {themeChangeButtton}
        <div className="space-x-4 flex">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="profile-avatar cursor-pointer">
                <Avatar className="profile-avatar-image w-12 h-12">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Israel Olatunle"
                  />
                  <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                    IO
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-20">
                <DropdownMenuItem className="text-xl text-red-600 px-5">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button className="md:px-8 md:py-3 hover:scale-105 ml-10 md:ml-0">
                <Link to={"/signin"}>Signin</Link>
              </Button>
              <Button className="md:px-8 md:py-3 hover:scale-105">
                <Link to={"/signup"}>Signup</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Navbar;

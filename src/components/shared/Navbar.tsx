import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <main className="flex justify-between p-3 border-b px-10">
      <div className="flex gap-2 items-center">
        <span className="text-3xl font-bold">B</span>
        <p className="text-2xl font-bold ">Bloggr</p>
      </div>
      <div className="flex gap-6">
        <div>
          <Input placeholder="Search" className="w-[250px] " />
          <Search className="text-black h-7 w-7 absolute top-4 right-74" />
        </div>
        <div className="space-x-4 flex ">
          <Button className="px-8 py-3 hover:scale-105">
            <Link to={"/signin"}>Signin</Link>
          </Button>
          <Button className="px-8 py-3 hover:scale-105">
            <Link to={"/signup"}>Signup</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Navbar;

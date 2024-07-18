import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";



const Header = () => {
 
  return (
    <>
      <div className="border-b-2 border-b-gray-500 py-6">
        <div className="container mx-auto flex justify-between  items-center md:hidden float-end">
          <Link
            to="/"
            className="text-3xl font-bold tracking-tig  text-emerald-800"
          >
            UnityHub
          </Link>
          <MobileNav />
        </div>

        <div className="container mx-auto  hidden  md:block">
          <div className="flex gap-20 items-center">
            <Link
              to="/"
              className="text-3xl font-bold tracking-tig text-emerald-800"
            >
              UnityHub
            </Link>
            <MainNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

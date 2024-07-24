import { Link } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="w-full bg-[rgba(10,20,30,1)] flex justify-between items-center px-8 py-3 fixed top-0 left-0 z-[1000] box-border shadow-md">
      <Link
        to="/"
        className="text-white text-3xl font-bold tracking-wider no-underline transition-all duration-300 ease-in-out hover:text-[#ff6347] hover:scale-105"
      >
        Quote
      </Link>
      <div className="flex gap-6 items-center">
        <Search />
        {/* accessToken ? 로그아웃 : 로그인 */}
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/services">서비스</NavLink>
        <NavLink to="/contact">연락처</NavLink>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white no-underline text-base relative transition-all duration-300 ease-in-out hover:text-[#ff6347] hover:-translate-y-0.5 group"
  >
    {children}
    <span className="absolute w-0 h-0.5 bg-[#ff6347] bottom-[-5px] left-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
  </Link>
);

export default Navbar;

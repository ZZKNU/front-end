import { Link } from "react-router-dom";
import Search from "./Search";
import LikeButton from "./LikeBtn";
import ShareBtn from "./ShareBtn";

const Navbar = () => {
  return (
    <nav className="w-full bg-indigo-300 flex justify-between items-center px-4 sm:px-8 py-4 sticky top-0 left-0 z-[1000]">
      <Link
        to="/"
        className="text-2xl sm:text-3xl font-bold tracking-wider no-underline text-white transition-all duration-300 ease-in-out hover:text-indigo-200"
      >
        Quote
      </Link>
      <div className="flex gap-2 sm:gap-6 items-center">
        <Search />
        <NavLink to="/">홈</NavLink>
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/create">글쓰기</NavLink>
        <LikeButton />
        <ShareBtn />
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="no-underline text-sm sm:text-base relative text-white transition-all duration-300 ease-in-out hover:text-indigo-200 group"
  >
    {children}
    <span className="absolute w-0 h-0.5 bg-indigo-200 bottom-[-5px] left-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
  </Link>
);

export default Navbar;

import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const NavbarContainer = styled.nav`
  width: 100%;
  background-color: rgba(10, 20, 30, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavLogo = styled(Link)`
  color: #fff;
  font-size: 1.8rem;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #ff6347;
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #ff6347;
    transition: width 0.3s ease-in-out;
  }

  &:hover {
    color: #ff6347;
    transform: translateY(-2px);

    &:after {
      width: 100%;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 15px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: #fff;
  padding: 5px;
  font-size: 0.9rem;
  width: 150px;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff6347;
  }
`;

const Navbar = () => {
  // todo : Token 유무에 따라 상단바 변화 //
  return (
    <NavbarContainer>
      <NavLogo to="/">Quote</NavLogo>
      <NavLinks>
        <SearchContainer>
          <SearchInput placeholder="Search..." />
          <SearchIcon />
        </SearchContainer>
        {/* accessToken ? 로그아웃 : 로그인 */}
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/services">서비스</NavLink>
        <NavLink to="/contact">연락처</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

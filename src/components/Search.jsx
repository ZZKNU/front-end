import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

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

const Search = () => {
  return (
    <SearchContainer>
      <SearchInput placeholder="Search..." />
      <SearchIcon />
    </SearchContainer>
  );
};

export default Search;

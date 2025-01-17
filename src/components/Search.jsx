import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { searchFriends } from "../apis/api";
import SearchResult from "./SearchResult";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(120, 53, 15, 0.1);
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 15px;
  border: 1px solid rgba(120, 53, 15, 0.2);
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: #78350f;
  padding: 5px;
  font-size: 0.9rem;
  width: 150px;
  outline: none;

  &::placeholder {
    color: rgba(120, 53, 15, 0.7);
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #78350f;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #92400e;
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const res = await searchFriends(searchTerm);
      setSearchResults(res);
      setIsModalOpen(true);
      setSearchTerm("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <SearchContainer>
        <SearchInput
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <SearchIcon onClick={handleSearch} />
      </SearchContainer>
      <SearchResult
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchResults={searchResults}
      />
    </>
  );
};

export default Search;

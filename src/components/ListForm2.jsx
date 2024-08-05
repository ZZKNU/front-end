import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import RenderList from "./RenderList";
import Pagination from "./Pagination";
import { usePagination } from "../hooks/usePagination";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getAllQuoteList, getBestQuoteList } from "../apis/api";
import axiosInstance from "../apis/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

const ListForm2 = ({ isBest = false, name }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const limit = 6;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  ); // 검색어 초기화
  const [allPosts, setAllPosts] = useState([]); // 모든 게시글 상태 추가

  const { currentPage, numberOfPages, setCurrentPage, setNumberOfPosts } =
    usePagination(limit);

  const fetchPosts = async () => {
    const data = isBest
      ? await getBestQuoteList({ page: 0, size: limit * 100 }) // 충분한 양의 데이터를 가져오기 위해 큰 수 설정
      : await getAllQuoteList({ page: 0, size: limit * 100 }); // 동일하게
    setAllPosts(data); // 모든 게시글 저장
    setNumberOfPosts(data.length); // 총 게시글 수 설정
  };

  useEffect(() => {
    fetchPosts();
  }, [isBest]);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage, setCurrentPage]);

  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString(), search: searchText }); // 페이지 변경 시 검색어 유지
  };

  const handlePostClick = (postId) => {
    navigate(`/list/${postId}`);
  };

  if (!allPosts.length) return <LoadingSpinner />;

  const onSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`${location.pathname}?page=1&search=${searchText}`); // 검색어와 함께 페이지 변경
      setCurrentPage(1); // 현재 페이지를 1로 설정
    }
  };

  const numberOfFilteredPages = Math.ceil(filteredPosts.length / limit);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-4">
        <Link to="/alllist" className="btn btn-outline-primary mx-2">
          전체
        </Link>
        <Link to="/bestlist" className="btn btn-outline-primary mx-2">
          베스트 도전
        </Link>
      </div>
      <h1 className="mb-4">{name}</h1>
      <input
        type="text"
        placeholder="Search.."
        className="form-control"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={onSearch}
      />
      <hr />
      {!filteredPosts.length ? (
        <div>No posts found</div>
      ) : (
        <>
          <RenderList
            posts={filteredPosts.slice(
              (currentPage - 1) * limit,
              currentPage * limit
            )}
            onClick={handlePostClick}
          />
          {numberOfFilteredPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfFilteredPages}
              onClick={handlePageChange}
              limit={3}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListForm2;

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import RenderList from "./RenderList";
import Pagination from "./Pagination";
import { usePagination } from "../hooks/usePagination";
import { Link, useSearchParams } from "react-router-dom";

const ListForm = ({ isBest = false, name }) => {
  const limit = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const { currentPage, numberOfPages, setCurrentPage, setNumberOfPosts } =
    usePagination(limit);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = useCallback(
    (page) => {
      let params = {
        _page: page,
        _limit: limit,
        _sort: "id",
        _order: "asc",
      };

      if (isBest) {
        params = { ...params, best: true };
      }

      axios
        .get(`http://localhost:3001/posts`, {
          params,
        })
        .then((res) => {
          setNumberOfPosts(res.headers["x-total-count"]);
          setPosts(res.data);
          setLoading(false);
        });
    },
    [isBest, setNumberOfPosts]
  );

  useEffect(() => {
    setCurrentPage(initialPage); // URL에서 읽은 페이지로 상태 설정
    getPosts(initialPage);
  }, [getPosts, initialPage, setCurrentPage]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page }); // URL 쿼리 파라미터 업데이트
    getPosts(page);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <Link
          to="/alllist"
          className="bg-indigo-300 text-white font-bold py-2 px-4 rounded w-32 h-12 mx-2 flex items-center justify-center no-underline whitespace-nowrap"
        >
          전체
        </Link>
        <Link
          to="/bestlist"
          className="bg-indigo-300 text-white font-bold py-2 px-4 rounded w-32 h-12 mx-2 flex items-center justify-center no-underline whitespace-nowrap"
        >
          베스트 도전
        </Link>
      </div>
      <div className="container mt-4">
        <h1 className="container d-flex justify-content-between">{name}</h1>
        <hr />
        {posts.length === 0 ? (
          <div>No posts found</div>
        ) : (
          <>
            <RenderList posts={posts} />
            {numberOfPages > 1 && (
              <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                onClick={handlePageChange} // 페이지 변경 시 함수 호출
                limit={3}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListForm;

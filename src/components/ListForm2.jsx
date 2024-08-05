import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import RenderList from "./RenderList";
import Pagination from "./Pagination";
import { usePagination } from "../hooks/usePagination";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getAllQuoteList, getBestQuoteList } from "../apis/api";

const ListForm2 = ({ isBest = false, name }) => {
  const navigate = useNavigate();
  const limit = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const { currentPage, numberOfPages, setCurrentPage, setNumberOfPosts } =
    usePagination(limit);

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quotes", currentPage, limit, isBest],
    queryFn: async () => {
      const data = isBest
        ? await getBestQuoteList({ page: currentPage, limit })
        : await getAllQuoteList({ page: currentPage, limit });
      return data;
    },
    keepPreviousData: true,
    staleTime: 60000,
    gcTime: 300000,
  });

  useEffect(() => {
    setCurrentPage(initialPage);
    setNumberOfPosts(posts.length);
  }, [initialPage, setCurrentPage, posts.length, setNumberOfPosts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  const handlePostClick = (postId) => {
    navigate(`/list/${postId}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

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
      {!posts || posts.length === 0 ? (
        <div>No posts found</div>
      ) : (
        <>
          <RenderList posts={posts} onClick={handlePostClick} />
          {numberOfPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
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
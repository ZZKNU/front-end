import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import RenderList from "./RenderList";
import Pagination from "./Pagination";
import { usePagination } from "../hooks/usePagination";
import { Link, useSearchParams } from "react-router-dom";
import { getBestQuoteList } from "../apis/api";

// eslint-disable-next-line react/prop-types
const ListForm2 = ({ isBest = false, name }) => {
  const limit = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const { currentPage, numberOfPages, setCurrentPage, setNumberOfPosts } =
    usePagination(limit);

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quotes", currentPage, limit, isBest],
    queryFn: () => getBestQuoteList({ page: currentPage, limit, isBest }),
    keepPreviousData: true,
    staleTime: 60000, // 1분
    gcTime: 300000, // 5분 (cacheTime이 gcTime으로 변경됨)
    onSuccess: (data) => {
      setNumberOfPosts(data.totalCount);
    },
  });

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage, setCurrentPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
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
                onClick={handlePageChange}
                limit={3}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListForm2;

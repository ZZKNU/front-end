import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const usePagination = (limit) => {
  const location = useLocation();
  const pageParam = new URLSearchParams(location.search).get("page");

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    setCurrentPage(+pageParam || 1);
  }, [pageParam]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts, limit]);

  return {
    currentPage,
    numberOfPages,
    setCurrentPage,
    setNumberOfPosts,
  };
};

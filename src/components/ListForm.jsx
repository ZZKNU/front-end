import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import RenderList from "./RenderList";
import Pagination from "./Pagination";
import { usePagination } from "../hooks/usePagination";
import { Link } from "react-router-dom";

const ListForm = ({ isBest = false, name }) => {
  const limit = 5;

  const {
    currentPage,
    numberOfPages,
    setCurrentPage,
    handleClickPageButton,
    setNumberOfPosts,
  } = usePagination(limit);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = useCallback(
    (page = 1) => {
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
    getPosts(currentPage);
  }, [getPosts, currentPage]);

  if (loading) {
    return <LoadingSpinner />;
  }

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
          <div>No blog posts found</div>
        ) : (
          <>
            <RenderList posts={posts} />
            {numberOfPages > 1 && (
              <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                onClick={handleClickPageButton}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListForm;

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteQuote, getBestQuoteDetail, getUserInfo } from "../apis/api";
import LikeButton from "../components/LikeBtn";
import { useQueryClient } from "@tanstack/react-query";

const ShowPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAuthStore();
  const [user, setUser] = useState(null);

  const getPost = async (id) => {
    try {
      const res = await getBestQuoteDetail(id);
      setPost(res);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await getUserInfo();
      setUser(res);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getPost(id);
  }, [id]);

  const handleDelete = async () => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (post.author !== user?.nickname) {
      alert("자신이 작성한 글만 삭제할 수 있습니다.");
      return;
    }

    if (window.confirm("정말로 이 글을 삭제하시겠습니까?")) {
      try {
        await deleteQuote(id);
        alert("글이 삭제되었습니다.");
        queryClient.invalidateQueries(["quotes"]);
        navigate("/bestlist"); // Navigate to the list page
      } catch (error) {
        alert("글 삭제 중 오류가 발생했습니다.");
        console.error("Delete error:", error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>{post.title}</h1>
        <Link className="btn btn-primary" to={`/list/${id}/edit`}>
          Edit
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          삭제
        </button>
      </div>
      글쓴이 : <small className="text-muted">{post.author}</small>
      <hr />
      <p>{post.content}</p>
      <div className="mt-4 d-flex align-items-center">
        <LikeButton challenge_id={id} />
        <button
          className="btn btn-secondary ml-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ShowPage;

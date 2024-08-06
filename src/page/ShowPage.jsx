import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store";
import { useQueryClient } from "@tanstack/react-query";
import { deleteQuote, getBestQuoteDetail, getUserInfo } from "../apis/api";
import LikeButton from "../components/LikeBtn";
import ShareBtn from "../components/ShareBtn";
import { FaTrash, FaEdit, FaArrowLeft } from "react-icons/fa";

const ShowPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAuthStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, userData] = await Promise.all([
          getBestQuoteDetail(id),
          getUserInfo(),
        ]);
        setPost(postData);
        setUser(userData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (post.nickname !== user?.nickname) {
      alert("자신이 작성한 글만 삭제할 수 있습니다.");
      return;
    }

    if (window.confirm("정말로 이 글을 삭제하시겠습니까?")) {
      try {
        await deleteQuote(id);
        alert("글이 삭제되었습니다.");
        queryClient.invalidateQueries(["quotes"]);
        navigate("/bestlist");
      } catch (error) {
        alert("글 삭제 중 오류가 발생했습니다.");
        console.error("Delete error:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="max-w-lg mx-auto mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
            {post.author === user?.nickname ? (
              <div className="space-x-2">
                <Link
                  to={`/list/${id}/edit`}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaEdit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaTrash className="h-4 w-4 mr-1" />
                  삭제
                </button>
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            <p className="font-normal">
              작가:<span className="font-semibold">{post.author}</span>{" "}
            </p>
            글쓴이: <span className="font-semibold">{post.nickname}</span>
          </p>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700 leading-relaxed">{post.content}</p>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <LikeButton isLiked={post.isLiked} challenge_id={id} />
            <ShareBtn id={id} title={post.title} />
          </div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPage;

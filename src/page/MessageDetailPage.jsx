import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiTrash2, FiMail } from "react-icons/fi";
import { getSpecificMessage, deleteMessage } from "../apis/api";

const MessageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessage();
  }, [id]);

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const data = await getSpecificMessage(id);
      setMessage(data);
    } catch (err) {
      setError("메시지를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 메시지를 삭제하시겠습니까?")) {
      try {
        await deleteMessage(id);
        alert("메시지가 삭제되었습니다.");
        navigate(-1);
      } catch (err) {
        alert("메시지 삭제에 실패했습니다.");
      }
    }
  };

  if (loading) return <div className="p-4 text-center">로딩 중...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!message)
    return <div className="p-4 text-center">메시지를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto max-w-md bg-white min-h-screen flex flex-col">
      <div className="border-b p-4 flex justify-between items-center sticky top-0 bg-white z-10">
        <div className="flex items-center">
          <FiChevronLeft
            className="h-6 w-6 mr-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-semibold">메시지 상세</h1>
        </div>
        <div className="flex items-center">
          <FiTrash2
            className="h-6 w-6 cursor-pointer text-red-500"
            onClick={handleDelete}
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-gray-600 mb-1">
            {message.sender_id === message.receiver_id
              ? "보낸 사람:"
              : "받는 사람:"}
          </p>
          <p className="font-semibold text-lg">
            {message.sender_id === message.receiver_id
              ? message.sender_nickName
              : message.receiver_nickName}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 mb-1">제목:</p>
          <p className="font-semibold text-xl">{message.message_title}</p>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 mb-1">날짜:</p>
          <p>{new Date(message.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-2">내용:</p>
          <p className="whitespace-pre-wrap bg-white p-4 rounded-lg border">
            {message.message_content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailPage;

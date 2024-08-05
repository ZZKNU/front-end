import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFollowList } from "../apis/api";

const MessageForm = ({ onSendMessage, onClose, initialRecipient, userId }) => {
  const [recipient, setRecipient] = useState(initialRecipient || "");
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const [allFriends, setAllFriends] = useState([]);

  const { data, status, error } = useQuery({
    queryKey: ["friends", userId, page],
    queryFn: () => getFollowList(),
    keepPreviousData: true,
  });

  useEffect(() => {
    setAllFriends(data);
    if (data && data.content) {
      // 새로운 친구 데이터를 기존 리스트에 추가
      setAllFriends((prevFriends) => {
        const newFriends = data.content.filter(
          (newFriend) =>
            !prevFriends.some((friend) => friend.id === newFriend.id)
        );
        return [...prevFriends, ...newFriends];
      });

      // 총 페이지 수를 로컬 스토리지에 저장
      localStorage.setItem("totalFriendsPages", data.totalPages);

      // 데이터 로딩이 완료되면 선택된 수신자가 없을 경우 첫 번째 친구를 기본값으로 설정
      if (!recipient && data.content.length > 0) {
        setRecipient(data.content[0].email);
      }
    }
  }, [data, queryClient, recipient]);

  const hasMore = data ? !data.last : false;

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipient && message.trim()) {
      onSendMessage({ recipient, message });
      setRecipient("");
      setMessage("");
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className="space-y-4">
      <div>
        <label
          htmlFor="recipient"
          className="block text-sm font-medium text-gray-700"
        >
          받는 사람
        </label>
        <select
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="">친구를 선택하세요</option>
          {status === "loading" && allFriends.length === 0 ? (
            <option>로딩 중...</option>
          ) : status === "error" ? (
            <option>오류 발생: {error.message}</option>
          ) : (
            allFriends?.map((friend) => (
              <option key={friend.id} value={friend.email}>
                {friend.nickName}
              </option>
            ))
          )}
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          메시지
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        쪽지 보내기
      </button>
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={status === "loading"}
          className="mt-4 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
          {status === "loading" ? "로딩 중..." : "더 많은 친구 불러오기"}
        </button>
      )}
    </form>
  );
};

const MessageModal = ({
  isOpen,
  onClose,
  onSendMessage,
  initialRecipient,
  userId,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="쪽지 보내기">
      <div className="flex justify-end">
        <Link
          className="bg-indigo-600 text-white rounded-full px-3 py-1 hover:bg-indigo-700 no-underline"
          to="/messagelist"
          onClick={() => {
            onClose();
          }}
        >
          메시지 목록
        </Link>
      </div>
      <MessageForm
        onSendMessage={onSendMessage}
        onClose={onClose}
        initialRecipient={initialRecipient}
        userId={userId}
      />
    </Modal>
  );
};

export default MessageModal;

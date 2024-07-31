import { useState, useEffect } from "react";
import Modal from "./Modal";
// import { getFollowList } from "../apis/api";

const friendList = [
  { id: 1, name: "친구1" },
  { id: 2, name: "친구2" },
  { id: 3, name: "친구3" },
  { id: 4, name: "친구4" },
  { id: 5, name: "친구5" },
];
// eslint-disable-next-line react/prop-types
const MessageForm = ({ onSendMessage, onClose, initialRecipient }) => {
  const [recipient, setRecipient] = useState(initialRecipient || "");
  const [message, setMessage] = useState("");
  //   const [friendList, setFriendList] = useState([]);
  //   const [page, setPage] = useState(0);
  //   const [hasMore, setHasMore] = useState(true);
  //   useEffect(() => {
  //     loadFriends();
  //   }, []);
  //   const loadFriends = async () => {
  //     try {
  //       const response = await getFollowList(user_id, page);
  //       const newFriends = response.content;
  //       setFriendList((prevList) => [...prevList, ...newFriends]);
  //       setHasMore(!response.last);
  //       setPage((prevPage) => prevPage + 1);
  //     } catch (error) {
  //       console.error("친구 목록을 불러오는 중 오류 발생:", error);
  //     }
  //   };

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
    <form onSubmit={handleSubmit} className="space-y-4">
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
          {friendList.map((friend) => (
            <option key={friend.id} value={friend.name}>
              {friend.name}
            </option>
          ))}
        </select>
      </div>
      {/* content.body */}
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

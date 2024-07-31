import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import FriendList from "./FriendList";
import MessageModal from "./MessageForm";

const ShareBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setIsMessageModalOpen(true);
    setIsOpen(false);
  };

  const handleSendMessage = (messageData) => {
    // function : 메세지 전송API//
    console.log("Sending message to:", selectedFriend, "Message:", messageData);
    setIsMessageModalOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="p-2 focus:outline-none"
        aria-label="Share"
      >
        <FaShareAlt className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">공유</h3>
            <FriendList onFriendSelect={handleFriendSelect} />
          </div>
          <div className="border-t px-4 py-2">
            <button
              onClick={toggleModal}
              className="w-full text-left text-sm text-gray-600 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onSendMessage={handleSendMessage}
        initialRecipient={selectedFriend ? selectedFriend.name : ""}
      />
    </div>
  );
};

export default ShareBtn;

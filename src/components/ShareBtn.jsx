import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import FriendList from "./FriendList";
import MessageModal from "./MessageForm";
import { postMessage } from "../apis/api";

const ShareBtn = ({ id, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setIsMessageModalOpen(true);
    setIsOpen(false);
  };

  const handleSendMessage = async (messageData) => {
    await postMessage(selectedFriend.id, id, title);
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
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full m-4">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">공유</h3>
              <FriendList
                onFriendSelect={handleFriendSelect}
                showUnfollowButton={false}
              />
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
        </div>
      )}

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onSendMessage={handleSendMessage}
        initialRecipient={selectedFriend ? selectedFriend.email : ""}
        userId={id}
      />
    </div>
  );
};

export default ShareBtn;

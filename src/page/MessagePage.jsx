import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiEdit, FiChevronRight } from "react-icons/fi";
import MessageModal from "../components/MessageForm";
import { getUserInfo } from "../apis/api";

const MessageListPage = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUser = async () => {
    try {
      const res = await getUserInfo();
      setUser(res);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  // 샘플 데이터
  const receivedMessages = [
    {
      id: 1,
      username: "scissorsloveyou",
      lastMessage: "View video from scisso...",
      time: "now",
      unread: true,
      emoji: "🍕🍔🍟",
    },
    { id: 2, username: "paper_wins", lastMessage: "View photo", time: "2m" },
    {
      id: 3,
      username: "eraser_1990",
      lastMessage: "omg lol",
      time: "2m",
      emoji: "😂",
    },
    { id: 4, username: "paperxclip", lastMessage: "Delivered", time: "2h" },
    {
      id: 5,
      username: "bday planning!!",
      lastMessage: "Opened by 3",
      time: "3h",
    },
  ];

  const sentMessages = [
    {
      id: 1,
      username: "big stapler",
      lastMessage: "Hey, how's it going?",
      time: "1h",
    },
    {
      id: 2,
      username: "pencil_sharp",
      lastMessage: "Did you get my last message?",
      time: "3h",
    },
    {
      id: 3,
      username: "notebook_lover",
      lastMessage: "See you tomorrow!",
      time: "5h",
    },
    {
      id: 4,
      username: "ink_master",
      lastMessage: "Thanks for the help!",
      time: "1d",
    },
  ];

  const tabVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
    setActiveTab(activeTab === "received" ? "sent" : "received");
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSendMessage = (data) => {
    console.log(data);
    closeModal();
  };
  return (
    <div className="container mx-auto max-w-md bg-white h-screen flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <FiChevronLeft
            className="h-6 w-6 mr-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-semibold">메시지</h1>
        </div>
        <FiEdit className="h-6 w-6 cursor-pointer" onClick={openModal} />
      </div>

      <div className="flex border-b">
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === "received"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => activeTab !== "received" && paginate(-1)}
        >
          받은 메시지
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === "sent"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => activeTab !== "sent" && paginate(1)}
        >
          보낸 메시지
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="h-full overflow-y-auto"
          >
            {(activeTab === "received" ? receivedMessages : sentMessages).map(
              (message) => (
                <div
                  key={message.id}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${
                        message.unread ? "text-black" : "text-gray-700"
                      }`}
                    >
                      {message.username}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <p className="mr-1">{message.lastMessage}</p>
                      <p>· {message.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {message.emoji && (
                      <span className="mr-2">{message.emoji}</span>
                    )}
                    <FiChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <MessageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSendMessage={handleSendMessage}
        userId={user.id}
      />
    </div>
  );
};

export default MessageListPage;

import { Link } from "react-router-dom";
import { FaComments, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Search from "./Search";
import FortuneModal from "./FortuneModal";
import MessageModal from "./MessageForm";
import { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFortuneModalOpen, setIsFortuneModalOpen] = useState(false);

  const toggleMessageModal = () => setIsMessageModalOpen(!isMessageModalOpen);
  const toggleFortuneModal = () => setIsFortuneModalOpen(!isFortuneModalOpen);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full bg-indigo-300 w-64 z-40 flex flex-col p-4"
          >
            <div className="flex justify-between items-center mb-8">
              <Link
                to="/"
                className="text-2xl font-bold tracking-wider no-underline text-white"
              >
                Quote
              </Link>
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-indigo-200"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <Search />
              <NavLink to="/" onClick={toggleSidebar}>
                홈
              </NavLink>
              <NavLink to="/alllist" onClick={toggleSidebar}>
                전체 게시글
              </NavLink>
              <NavLink to="/login" onClick={toggleSidebar}>
                로그인
              </NavLink>
              <NavLink to="/create" onClick={toggleSidebar}>
                글쓰기
              </NavLink>
              <NavLink to="/my" onClick={toggleSidebar}>
                마이페이지
              </NavLink>
              <button
                onClick={() => {
                  toggleMessageModal();
                  toggleSidebar();
                }}
                className="text-white hover:text-indigo-200 flex items-center gap-2"
              >
                <FaComments /> 메시지
              </button>
              <button
                onClick={toggleFortuneModal}
                className="text-white hover:text-indigo-200"
              >
                운세 보기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-white bg-indigo-500 p-2 rounded-md"
        >
          <FaBars />
        </button>
      )}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={toggleMessageModal}
        onSendMessage={(messageData) => {
          console.log("Sending message:", messageData);
          toggleMessageModal();
        }}
      />
      <FortuneModal isOpen={isFortuneModalOpen} onClose={toggleFortuneModal} />
    </>
  );
};

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="no-underline text-base relative text-white transition-all duration-300 ease-in-out hover:text-indigo-200 group"
  >
    {children}
    <span className="absolute w-0 h-0.5 bg-indigo-200 bottom-[-5px] left-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
  </Link>
);

export default Sidebar;

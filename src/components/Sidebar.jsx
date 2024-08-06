import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Search from "./Search";
import FortuneModal from "./FortuneModal";
import MessageModal from "./MessageForm";
import { useAuthStore } from "../store";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFortuneModalOpen, setIsFortuneModalOpen] = useState(false);
  const { accessToken, clearAuth } = useAuthStore();
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
            className="fixed top-0 left-0 h-full bg-gradient-to-b from-amber-100 to-amber-200 w-64 z-40 flex flex-col p-4 shadow-lg"
          >
            <div className="flex justify-between items-center mb-8">
              <Link
                to="/"
                className="text-2xl font-bold tracking-wider no-underline text-amber-800"
              >
                Pooguel
              </Link>
              <button
                onClick={toggleSidebar}
                className="text-amber-700 hover:text-amber-900 transition-colors duration-300"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <Search />
              <NavLink to="/" onClick={toggleSidebar}>
                홈
              </NavLink>

              {accessToken ? (
                <>
                  <NavLink to="/alllist" onClick={toggleSidebar}>
                    전체 게시글
                  </NavLink>
                  <NavLink to="/create" onClick={toggleSidebar}>
                    글쓰기
                  </NavLink>
                  <NavLink to="/my" onClick={toggleSidebar}>
                    마이페이지
                  </NavLink>
                  <NavLink to="/messagelist" onClick={toggleSidebar}>
                    쪽지
                  </NavLink>
                  <NavLink to="/" onClick={() => clearAuth()}>
                    로그아웃
                  </NavLink>
                  <button
                    onClick={toggleFortuneModal}
                    className="text-amber-700 hover:text-amber-900 transition-colors duration-300 text-left"
                  >
                    운세 보기
                  </button>
                </>
              ) : (
                <NavLink to="/login" onClick={toggleSidebar}>
                  로그인
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-amber-800 bg-amber-100 p-2 rounded-full shadow-md hover:bg-amber-200 transition-colors duration-300"
        >
          <FaBars size={24} />
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
    className="no-underline text-base relative text-amber-700 transition-all duration-300 ease-in-out hover:text-amber-900 group"
  >
    {children}
    <span className="absolute w-0 h-0.5 bg-amber-500 bottom-[-5px] left-0 transition-all duration-300 ease-in-out group-hover:w-full"></span>
  </Link>
);

export default Sidebar;

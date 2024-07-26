// MyPage.js
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaListUl,
  FaHeart,
  FaUserFriends,
  FaCog,
  FaPencilAlt,
} from "react-icons/fa";
import { FaComments } from "react-icons/fa6";
import Modal from "../components/Modal";

const MenuItem = ({ icon, text, onClick }) => (
  <div
    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
    onClick={onClick}
  >
    {icon}
    <span className="ml-4">{text}</span>
  </div>
);

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState("이름");
  const [newNickname, setNewNickname] = useState("");

  const handleMenuClick = (item) => {
    console.log(`Clicked on ${item}`);
    // Add your logic here
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewNickname(nickname);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleSaveNickname = () => {
    setNickname(newNickname);
    setIsModalOpen(false);
    // 여기에 실제 닉네임 변경 로직을 추가할 수 있습니다.
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-400 text-black p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{nickname}</h1>
                <FaPencilAlt
                  className="ml-2 text-gray-600 cursor-pointer"
                  onClick={handleOpenModal}
                />
              </div>
              <p className="text-sm opacity-80">여기는 한 줄 소개?</p>
            </div>
            <img
              src="/api/placeholder/150/150"
              alt="프사 있나요"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          <MenuItem
            icon={<FaListUl className="text-gray-600" />}
            text="내가 쓴 글"
            onClick={() => handleMenuClick("내가 쓴 글")}
          />
          <MenuItem
            icon={<FaHeart className="text-gray-600" />}
            text="즐겨찾기"
            onClick={() => handleMenuClick("즐겨찾기")}
          />
          <MenuItem
            icon={<FaUserFriends className="text-gray-600" />}
            text="내 친구"
            onClick={() => handleMenuClick("내 친구")}
          />
          <MenuItem
            icon={<FaComments className="text-gray-600" />}
            text="쪽지"
            onClick={() => handleMenuClick("쪽지")}
          />
          <MenuItem
            icon={<FaCog className="text-gray-600" />}
            text="설정"
            onClick={() => handleMenuClick("설정")}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="닉네임 변경"
      >
        <input
          type="text"
          value={newNickname}
          onChange={handleNicknameChange}
          placeholder="새 닉네임을 입력하세요"
          className="w-full px-3 py-2 border rounded"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            onClick={handleSaveNickname}
          >
            저장
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;

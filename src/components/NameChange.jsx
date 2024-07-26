// NameChange.js
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "./Modal";

const NameChange = ({ currentNickname, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState(currentNickname);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewNickname(currentNickname);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleSaveNickname = () => {
    onSave(newNickname);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center">
      <h1 className="text-2xl font-bold">{currentNickname}</h1>
      <FaPencilAlt
        className="ml-2 text-gray-600 cursor-pointer"
        onClick={handleOpenModal}
      />
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

export default NameChange;

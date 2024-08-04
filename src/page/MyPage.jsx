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
import { useNavigate } from "react-router-dom";
import { deleteUser, getUserInfo, updateUserInfo } from "../apis/api";
import { useAuthStore } from "../store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    onSuccess: (data) => {
      setNewNickname(data.nickname);
    },
  });

  const updateNicknameMutation = useMutation({
    mutationFn: (newNickname) =>
      updateUserInfo(newNickname, userInfo.birthdate),
    onSuccess: () => {
      queryClient.invalidateQueries(["userInfo"]);
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Failed to update nickname:", error);
      // You can set a state here to show an error message in the UI
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearAuth();
      navigate("/");
    },
    onError: (error) => {
      console.error("Failed to delete user:", error);
      // You can set a state here to show an error message in the UI
    },
  });

  const handleMenuClick = (item) => {
    console.log(`Clicked on ${item}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewNickname(userInfo.nickname);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewNickname(userInfo.nickname);
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleSaveNickname = () => {
    updateNicknameMutation.mutate(newNickname);
  };

  const handleDeleteUser = () => {
    const userConfirmed = window.confirm("회원 탈퇴를 하시겠습니깡?");
    if (userConfirmed) {
      deleteUserMutation.mutate();
    } else {
      console.log("User canceled the deletion");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        사용자 정보를 불러오는데 실패했습니다: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-400 text-black p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">{userInfo.nickname}</h1>
                <FaPencilAlt
                  className="ml-2 text-gray-600 cursor-pointer"
                  onClick={handleOpenModal}
                />
              </div>
              <p className="text-sm opacity-80">{userInfo.email}</p>
              <p className="text-sm opacity-80">
                생년월일: {userInfo.birthdate}
              </p>
            </div>
            <img
              src="/api/placeholder/150/150"
              alt="프로필 이미지"
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
            text="좋아요 누른 글"
            onClick={() => handleMenuClick("좋아요 누른 글")}
          />
          <MenuItem
            icon={<FaUserFriends className="text-gray-600" />}
            text="친구 목록"
            onClick={() => handleMenuClick("친구")}
          />
          <MenuItem
            icon={<FaComments className="text-gray-600" />}
            text="쪽지함"
            onClick={() => navigate("/messagelist")}
          />
          <MenuItem
            icon={<FaCog className="text-gray-600" />}
            text="회원탈퇴"
            onClick={handleDeleteUser}
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
            disabled={updateNicknameMutation.isLoading}
          >
            {updateNicknameMutation.isLoading ? "저장 중..." : "저장"}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={handleCloseModal}
            disabled={updateNicknameMutation.isLoading}
          >
            취소
          </button>
        </div>
        {updateNicknameMutation.isError && (
          <p className="mt-2 text-red-500">
            닉네임 업데이트에 실패했습니다:{" "}
            {updateNicknameMutation.error.message}
          </p>
        )}
      </Modal>
    </div>
  );
};

export default MyPage;

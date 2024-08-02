import { useState, useEffect } from "react";
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
  const { clearTokens } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    email: "",
    birthdate: "",
  });
  const [newNickname, setNewNickname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const data = await getUserInfo();
        setUserInfo(data);
        setNewNickname(data.nickname);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setError("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleMenuClick = (item) => {
    console.log(`Clicked on ${item}`);
    // Add your logic here
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewNickname(userInfo.nickname);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewNickname(userInfo.nickname); // 모달을 닫을 때 원래 닉네임으로 리셋
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleSaveNickname = async () => {
    try {
      setIsLoading(true);
      const updatedInfo = await updateUserInfo(newNickname, userInfo.birthdate);
      setUserInfo(updatedInfo);
      setIsModalOpen(false);
      setError(null);
    } catch (error) {
      console.error("Failed to update nickname:", error);
      setError("닉네임 업데이트에 실패했습니다.");
      navigate("/my");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteUser = async () => {
    await deleteUser();
    clearTokens();
    navigate("/");
  };
  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
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
            onClick={() => handleMenuClick("쪽지")}
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
            disabled={isLoading}
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={handleCloseModal}
            disabled={isLoading}
          >
            취소
          </button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </Modal>
    </div>
  );
};

export default MyPage;

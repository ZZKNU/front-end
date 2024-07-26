import { FaListUl, FaHeart, FaUserFriends, FaCog } from "react-icons/fa";
import { FaComments } from "react-icons/fa6";
// eslint-disable-next-line react/prop-types
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
  const handleMenuClick = (item) => {
    console.log(`Clicked on ${item}`);
    // Add your logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-400 text-black p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">이름</h1>
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
    </div>
  );
};

export default MyPage;

import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
// import { getFollowerList } from "../apis/api";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    setIsLoading(true);
    try {
      // const response = await getFollowerList();
      // function : 친구목록 불러오기API//
      const mockData = [
        { id: 1, name: "친구1" },
        { id: 2, name: "친구2" },
        { id: 3, name: "친구3" },
      ];
      setTimeout(() => {
        setFriends(mockData);
        setIsLoading(false);
      }, 100);
    } catch (err) {
      setError("친구 목록을 불러오는 데 실패했습니다.");
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="friend-list w-full">
      {friends.length === 0 ? (
        <p className="text-gray-500 text-center">친구가 없습니다.</p>
      ) : (
        <ul className="space-y-2 p-0">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              onClick={() => alert(friend.name)}
            >
              <span className="font-semibold">{friend.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;

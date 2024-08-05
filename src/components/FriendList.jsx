import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getFollowerList, getFollowList, deleteFriends } from "../apis/api";

const FriendList = ({ onFriendSelect, showUnfollowButton = false }) => {
  const [follow, setFollow] = useState([]);
  const [follower, setFollower] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("follow");

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resFollow = await getFollowList();
      const resFollower = await getFollowerList();
      setFollow(resFollow);
      setFollower(resFollower);
    } catch (err) {
      setError("친구 목록을 불러오는 데 실패했습니다.");
      console.error("Error fetching friends:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async (friendId) => {
    if (window.confirm("정말로 이 사용자를 언팔로우하시겠습니까?")) {
      setIsLoading(true);
      try {
        const response = await deleteFriends(friendId);
        if (response.status === 204) {
          // 성공적으로 언팔로우되었을 때
          await fetchFriends(); // 친구 목록 재조회
        } else {
          throw new Error("Unfollow operation failed");
        }
      } catch (err) {
        setError("언팔로우에 실패했습니다. 다시 시도해 주세요.");
        console.error("Error unfollowing user:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  const renderFriendList = (friends, isFollowList) => (
    <ul className="space-y-2">
      {friends.map((friend) => (
        <li
          key={friend.id}
          className="flex justify-between items-center p-2 bg-gray-100 rounded"
        >
          <span
            onClick={() => onFriendSelect(friend)}
            className="cursor-pointer hover:text-blue-500"
          >
            {friend.nickName}
          </span>
          {showUnfollowButton && isFollowList && (
            <button
              onClick={() => handleUnfollow(friend.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              disabled={isLoading}
            >
              {isLoading ? "처리 중..." : "언팔로우"}
            </button>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 ${
            activeTab === "follow" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("follow")}
        >
          팔로우
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "follower" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("follower")}
        >
          팔로워
        </button>
      </div>

      {activeTab === "follow" ? (
        <div>
          <h3 className="font-bold mb-2">팔로우</h3>
          {follow.length === 0 ? (
            <p>팔로우 목록이 비어 있습니다.</p>
          ) : (
            renderFriendList(follow, true)
          )}
        </div>
      ) : (
        <div>
          <h3 className="font-bold mb-2">팔로워</h3>
          {follower.length === 0 ? (
            <p>팔로워 목록이 비어 있습니다.</p>
          ) : (
            renderFriendList(follower, false)
          )}
        </div>
      )}
    </div>
  );
};

export default FriendList;

import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getFollowerList, getFollowList } from "../apis/api";

const FriendList = ({ onFriendSelect }) => {
  const [follow, setFollow] = useState([]);
  const [follower, setFollower] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    setIsLoading(true);
    try {
      const resFollow = await getFollowList();
      const resFollower = await getFollowerList();
      setFollow(resFollow);
      setFollower(resFollower);
    } catch (err) {
      setError("친구 목록을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  const renderFriendList = (friends, title) => (
    <div>
      <h3>{title}</h3>
      {friends.length === 0 ? (
        <p>목록이 비어 있습니다.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              onClick={() => onFriendSelect(friend)}
              className="cursor-pointer"
            >
              {friend.nickName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  console.log("Follow:", follow);
  console.log("Follower:", follower);

  return (
    <div>
      {renderFriendList(follow, "팔로우")}
      {renderFriendList(follower, "팔로워")}
    </div>
  );
};

export default FriendList;

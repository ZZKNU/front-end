import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center justify-center p-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
      aria-label={liked ? "Unlike" : "Like"}
    >
      {liked ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-gray-500 hover:text-red-500 text-xl" />
      )}
    </button>
  );
};

export default LikeButton;

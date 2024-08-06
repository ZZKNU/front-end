import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeNormalQuote } from "../apis/api";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const LikeButton = ({ isLiked: initialIsLiked }) => {
  const [liked, setLiked] = useState(initialIsLiked);
  const queryClient = useQueryClient();
  const [isAnimating, setIsAnimating] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLiked(initialIsLiked);
  }, [initialIsLiked]);

  const toggleLike = async () => {
    setLiked((prevLiked) => !prevLiked);
    setIsAnimating(true);
    try {
      await likeNormalQuote(id);
      queryClient.invalidateQueries(["quotes"]);
      console.log(id);
    } catch (e) {
      console.error(e);
      setLiked(false);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative">
      <button
        onClick={toggleLike}
        className="flex items-center justify-center p-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
        aria-label={liked ? "Unlike" : "Like"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={liked ? "liked" : "unliked"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {liked ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-500 hover:text-red-500 text-xl" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {[...Array(12)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-1 bg-red-500 rounded-full"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0.5],
                  x: Math.cos(index * 30 * (Math.PI / 180)) * 20,
                  y: Math.sin(index * 30 * (Math.PI / 180)) * 20,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LikeButton;

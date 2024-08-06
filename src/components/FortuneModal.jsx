import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fortunes } from "../util/Fortune";

const FortuneModal = ({ isOpen, onClose }) => {
  const [fortune, setFortune] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
      setIsRevealed(false);
    }
  }, [isOpen]);

  const revealFortune = () => {
    setIsRevealed(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-white rounded-lg p-8 max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-64 mx-auto mb-4 relative flex items-center justify-center">
                {!isRevealed ? (
                  <motion.button
                    onClick={revealFortune}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition duration-300"
                  >
                    운세 확인하기
                  </motion.button>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg font-medium text-gray-800 text-center px-4"
                  >
                    {fortune}
                  </motion.p>
                )}
              </div>

              <motion.button
                onClick={onClose}
                className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full shadow transition duration-300 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                닫기
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FortuneModal;

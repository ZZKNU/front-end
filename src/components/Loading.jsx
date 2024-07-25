import { motion } from "framer-motion";

const Loading = () => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const circleTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  };

  return (
    <motion.div
      className="flex space-x-1"
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[1, 2, 3].map((index) => (
        <motion.span
          key={index}
          className="w-1.5 h-1.5 bg-white rounded-full"
          variants={circleVariants}
          transition={circleTransition}
        />
      ))}
    </motion.div>
  );
};

export default Loading;

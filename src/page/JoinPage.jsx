import SignupForm from "../components/SignupForm";
import { motion } from "framer-motion";

const JoinPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex"
      >
        <div className="w-1/2 bg-cream-50 p-12 hidden lg:block">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold text-amber-900 mb-6"
          >
            Wellness를 위한 첫 걸음
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-amber-900 text-xl"
          >
            "지금 가입하고 더 나은 삶을 만들어보세요."
          </motion.p>
        </div>
        <div className="w-full lg:w-1/2 p-12">
          <SignupForm />
        </div>
      </motion.div>
    </div>
  );
};

export default JoinPage;

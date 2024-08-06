import AccountForm from "../components/AccountForm";
import { motion } from "framer-motion";

const LoginPage = () => {
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
            당신의 Wellness 여정
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-amber-900 text-xl"
          >
            "당신의 마음과 몸을 돌보는 첫 걸음, 여기에 있습니다."
          </motion.p>
        </div>
        <div className="w-full lg:w-1/2 p-12">
          <AccountForm />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

import { FaPen } from "react-icons/fa";
import CreateForm from "../components/CreateForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";
import axios from "axios";

const CreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:3001/posts", {
        title: formData.title,
        body: formData.content,
        createdAt: new Date().getTime(),
      });
      console.log("Form submitted:", formData);
      navigate("/"); // Assuming you want to navigate to the home page after submission
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold text-gray-800 flex items-center justify-center"
          >
            <FaPen className="mr-3 text-indigo-600" size={32} />
            <span>새로운 이야기 시작하기</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-2 text-xl text-gray-600"
          >
            당신의 생각을 자유롭게 펼쳐보세요
          </motion.p>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <CreateForm onSubmit={handleSubmit} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-center text-gray-500 text-sm"
        >
          글쓰기에 몰입하세요. 당신의 이야기가 세상을 변화시킬 수 있습니다.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreatePage;

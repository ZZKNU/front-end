/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <motion.div
      className="fixed inset-0 z-0"
      style={{
        scale,
        background: "black",
      }}
    />
  );
};

const AnimatedText = ({ children, className }) => {
  const { scrollYProgress } = useScroll();
  const fontSize = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <motion.div className={className} style={{ scale: fontSize }}>
      {children}
    </motion.div>
  );
};

const ContentSection = ({ title, children }) => (
  <motion.section
    className="min-h-screen flex flex-col items-center justify-center text-white relative z-10"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.1 }}
  >
    <AnimatedText className="text-4xl font-bold mb-6">{title}</AnimatedText>
    {children}
  </motion.section>
);

const MainPage = () => {
  return (
    <div className="relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <ContentSection title="Main">
          <AnimatedText className="text-xl mb-8">스크롤</AnimatedText>
          <div className="space-x-4">
            <Link
              to="/alllist"
              className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-100 transition"
            >
              게시글 보기
            </Link>
          </div>
        </ContentSection>

        <ContentSection title="특징">
          <AnimatedText className="text-lg">
            <ul className="list-disc list-inside">
              <li>무슨 내용넣어야하죠</li>
            </ul>
          </AnimatedText>
        </ContentSection>

        <ContentSection title="시작하기">
          <AnimatedText className="text-xl mb-4">지금 바로 시작</AnimatedText>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            로그인
          </Link>
        </ContentSection>
      </div>
    </div>
  );
};

export default MainPage;

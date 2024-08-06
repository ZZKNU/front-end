import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Sun, Heart, MessageCircle, ChevronDown } from "lucide-react";
import { aphorisms } from "../util/Aphorism";
import { useAuthStore } from "../store";

const AnimatedText = ({ children, className }) => {
  const { scrollYProgress } = useScroll();
  const fontSize = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <motion.div
      className={className}
      style={{ scale: fontSize }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

const ContentSection = ({ title, children }) => (
  <motion.section
    className="min-h-screen flex flex-col items-center justify-center text-amber-800 relative z-10 px-4"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <AnimatedText className="text-5xl font-bold mb-6 text-center">
      {title}
    </AnimatedText>
    {children}
  </motion.section>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="bg-white bg-opacity-70 rounded-lg p-6 shadow-lg max-w-sm mx-auto"
    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.div
      className="flex items-center justify-center mb-4"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const QuoteBox = ({ quote, author }) => (
  <motion.div
    className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-md mx-auto my-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-xl italic mb-4">{quote}</p>
    <p className="text-right font-semibold">- {author}</p>
  </motion.div>
);

const ScrollPrompt = ( {string} ) => (
  <motion.div
    className="absolute bottom-4 flex flex-col items-center justify-center text-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-amber-800 mb-2">{string}</p>
    <ChevronDown className="animate-bounce text-amber-700" size={40} />
  </motion.div>
);

const MainPage = () => {
  const [showQuote, setShowQuote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    setShowQuote(aphorisms[Math.floor(Math.random() * aphorisms.length)]);
  }, []);

  return (
    <div className="relative">
      <div className="relative z-10">
        <ContentSection title="일상의 작은 위로">
          <AnimatedText className="text-3xl mb-8 text-amber-900 text-center max-w-2xl">
            매일의 순간을 특별하게 만드는 따뜻한 메시지들
          </AnimatedText>
          <ScrollPrompt string={"아래로 스크롤하여 더 많은 내용을 확인하세요!"}/>
          {accessToken ? (
            <>
              <motion.div
                className="space-y-4 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/alllist"
                  className="bg-gradient-to-r from-amber-300 to-orange-400 text-white px-8 py-3 rounded-full hover:from-amber-600 hover:to-orange-600 transition text-lg font-semibold shadow-lg"
                >
                  오늘의 메시지 보기
                </Link>
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-amber-700 flex items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  {isOpen ? "숨기기" : "오늘의 한마디 보기"}{" "}
                  <ChevronDown
                    className={`ml-1 transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </motion.button>
              </motion.div>
              <AnimatePresence>
                {isOpen && (
                  <QuoteBox
                    key={showQuote.id}
                    author={showQuote.author}
                    quote={showQuote.quote}
                  />
                )}
              </AnimatePresence>
            </>
          ) : (
            <></>
          )}
        </ContentSection>

        <ContentSection title="우리의 특징">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <FeatureCard
              icon={<Sun size={48} className="text-amber-500" />}
              title="매일의 긍정"
              description="하루를 밝게 시작할 수 있는 긍정적인 메시지를 제공합니다."
            />
            <FeatureCard
              icon={<Heart size={48} className="text-red-500" />}
              title="따뜻한 위로"
              description="힘든 순간을 이겨낼 수 있는 따뜻한 위로의 말을 전합니다."
            />
            <FeatureCard
              icon={<MessageCircle size={48} className="text-blue-500" />}
              title="서로의 응원"
              description="사용자들이 서로 응원하고 격려할 수 있는 커뮤니티를 제공합니다."
            />
          </div>
          <ScrollPrompt string={"시작해 볼까요?"}/>
        </ContentSection>
        

        <ContentSection title="함께 시작해요">
          <AnimatedText className="text-2xl mb-6 text-amber-900 text-center">
            지금 바로 당신의 하루를 밝혀줄 메시지를 만나보세요
          </AnimatedText>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/login"
              className="bg-gradient-to-r from-amber-300 to-orange-400 text-white px-8 py-3 rounded-full hover:from-amber-600 hover:to-orange-600  transition text-lg font-semibold shadow-lg"
            >
              시작하기
            </Link>
          </motion.div>
        </ContentSection>
      </div>
    </div>
  );
};

export default MainPage;

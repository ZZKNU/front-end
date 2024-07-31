import { useState } from 'react';

const MessagePage = () => {
  // 샘플 데이터
  const [sentMessages, setSentMessages] = useState([
    { id: 1, content: "안녕하세요! 잘 지내고 계신가요?" },
    { id: 2, content: "이번 주말에 만날까요?" },
    { id: 3, content: "프로젝트 진행 상황은 어떠신가요?" }
  ]);

  const [receivedMessages, setReceivedMessages] = useState([
    { id: 1, content: "안녕하세요! 저도 잘 지내고 있어요." },
    { id: 2, content: "주말에 만나는 건 좋습니다!" },
    { id: 3, content: "프로젝트는 순조롭게 진행되고 있습니다." }
  ]);

  return (
    <div className="container flex flex-col md:flex-row p-4 mt-10 space-x-4 justify-center items-start min-h-screen">
      {/* 보낸 메시지 */}
      <div className="flex-1 bg-blue-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">보낸 메시지</h2>
        <ul className="space-y-4">
          {sentMessages.map((message) => (
            <li key={message.id} className="border-b py-4">
              {message.content}
            </li>
          ))}
        </ul>
      </div>

      {/* 받은 메시지 */}
      <div className="flex-1 bg-green-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">받은 메시지</h2>
        <ul className="space-y-4">
          {receivedMessages.map((message) => (
            <li key={message.id} className="border-b py-4">
              {message.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagePage;

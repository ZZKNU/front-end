import React, { useState } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUsers,
  FiFileText,
  FiAward,
} from "react-icons/fi";

const AdminPage = () => {
  // 더미 데이터
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 도전", category: "일상", status: "PENDING" },
    { id: 2, title: "두 번째 도전", category: "요리", status: "ACCEPT" },
    { id: 3, title: "세 번째 도전", category: "여행", status: "REJECT" },
    { id: 4, title: "네 번째 도전", category: "스포츠", status: "PENDING" },
    { id: 5, title: "다섯 번째 도전", category: "기술", status: "ACCEPT" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    console.log(`Post ${id} status changed to ${newStatus}`);
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: newStatus } : post
      )
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: "bg-yellow-200 text-yellow-800",
      ACCEPT: "bg-green-200 text-green-800",
      REJECT: "bg-red-200 text-red-800",
    };
    const icons = {
      PENDING: <FiClock className="inline mr-1" />,
      ACCEPT: <FiCheckCircle className="inline mr-1" />,
      REJECT: <FiXCircle className="inline mr-1" />,
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-sm font-semibold ${styles[status]}`}
      >
        {icons[status]}
        {status}
      </span>
    );
  };

  const summary = {
    total: posts.length,
    accepted: posts.filter((post) => post.status === "ACCEPT").length,
    rejected: posts.filter((post) => post.status === "REJECT").length,
    pending: posts.filter((post) => post.status === "PENDING").length,
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">베스트 도전 관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FiFileText className="text-blue-500 text-3xl mr-2" />
            <div>
              <p className="text-gray-500">총 게시물</p>
              <p className="text-2xl font-bold">{summary.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FiCheckCircle className="text-green-500 text-3xl mr-2" />
            <div>
              <p className="text-gray-500">승인됨</p>
              <p className="text-2xl font-bold">{summary.accepted}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FiXCircle className="text-red-500 text-3xl mr-2" />
            <div>
              <p className="text-gray-500">거절됨</p>
              <p className="text-2xl font-bold">{summary.rejected}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FiClock className="text-yellow-500 text-3xl mr-2" />
            <div>
              <p className="text-gray-500">대기 중</p>
              <p className="text-2xl font-bold">{summary.pending}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">{post.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(post.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleStatusChange(post.id, "ACCEPT")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    disabled={post.status === "ACCEPT"}
                  >
                    수락
                  </button>
                  <button
                    onClick={() => handleStatusChange(post.id, "REJECT")}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    disabled={post.status === "REJECT"}
                  >
                    거절
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

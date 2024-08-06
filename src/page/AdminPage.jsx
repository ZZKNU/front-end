import { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiClock, FiFileText } from "react-icons/fi";
import {
  promoteQuote,
  authorityUser,
  getUserList,
  possiblePromoteList,
} from "../apis/api";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [promotablePosts, setPromotablePosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await getUserList();
      const promoteList = await possiblePromoteList();

      setUsers(userList);
      setPromotablePosts(promoteList);
    };

    fetchData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    console.log(`Post ${id} status changed to ${newStatus}`);
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: newStatus } : post
      )
    );
  };

  const handlePromoteQuote = async (id, auth = true) => {
    try {
      await promoteQuote(id, auth);
      console.log(`Quote ${id} promoted successfully`);
      setPromotablePosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== id)
      );
    } catch (error) {
      console.error(`Failed to promote quote ${id}`, error);
    }
  };

  const handleAuthorityChange = async (id, newAuthority) => {
    try {
      await authorityUser(id, newAuthority);
      console.log(`User ${id} authority changed to ${newAuthority}`);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, authority: newAuthority } : user
        )
      );
    } catch (error) {
      console.error(`Failed to change authority for user ${id}`, error);
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FiFileText className="text-blue-500 text-3xl mr-2" />
            <div>
              <p className="text-gray-500">총 게시물</p>
              <p className="text-2xl font-bold">{promotablePosts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FiCheckCircle className="text-green-500 text-3xl mr-2" />
            <div>
              <p className="text-gray-500">사용자 수</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
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

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <h2 className="text-2xl font-bold mt-2 ml-2">✅ 승격 가능한 글 목록</h2>
        <div className="overflow-x-auto">
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
                  유형
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  내용
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  글쓴이
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  인증됨
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  좋아요
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {promotablePosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{post.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.certified ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.liked}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={async () => handlePromoteQuote(post.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      승격
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-2xl font-bold mt-2 ml-2">✅ 사용자 목록</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이메일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  닉네임
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  생년월일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  권한
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.nickname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.birthdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.authority}
                      onChange={(e) =>
                        handleAuthorityChange(user.id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option value="USER">USER</option>
                      <option value="AUTHOR">AUTHOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                  {user.authority === "USER" ? (
                    <button
                      onClick={() => handleAuthorityChange(user.id, "AUTHOR")}
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
                    >
                      관리자 권한 부여
                    </button>
                  ) : (
                    <p />
                  )}
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

import axiosInstance from "./axiosInstance";
import { useAuthStore } from "../store";

/**
 * 로그인 요청 API
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const getLogin = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data;
};

/**
 * 회원가입 API
 * @param {string} email
 * @param {string} password
 * @param {string} nickname
 * @param {Date} birthDate
 * @returns
 */
export const getJoin = async (email, password, nickname, birthDate) => {
  const response = await axiosInstance.post("/auth/join", {
    email,
    password,
    nickname,
    birthDate,
  });
  const { accessToken, refreshToken } = response.data;
  useAuthStore.getState().setTokens(accessToken, refreshToken);
  return response.data;
};

/**
 * 회원탈퇴 API
 * @param {number} user_id
 * @returns
 */
export const deleteUser = async (user_id) => {
  const response = await axiosInstance.delete(`/users/${user_id}`);
  return response.data;
};

/**
 * 베스트 도전 목록에서 글 작성
 * @param {string} title
 * @param {string} content
 * @returns
 */
export const writeBestQuote = async (title, content) => {
  const response = await axiosInstance.post("/challenges", { title, content });
  return response.data;
};

/**
 * 베스트 도전에서 작성한 글 수정
 * @param {string} title
 * @param {string} content
 * @returns
 */
export const editBestQuote = async (title, content) => {
  const response = await axiosInstance.put("/challenges", { title, content });
  return response.data;
};

/**
 * 베스트 도전 글 조회
 * @returns
 */
export const getBestQuoteList = async () => {
  const response = await axiosInstance.get("/challenges");
  return response.data;
};

/**
 * 베스트 도전 좋아요 요청
 * @param {number} challenge_id
 * @returns
 */
export const likeBestQuote = async (challenge_id) => {
  const response = await axiosInstance.put(`/challenges/${challenge_id}`);
  return response.data;
};

/**
 * 베스트 도전 quote_id를 가진 글 조회
 * @param {number} quote_id
 * @returns
 */
export const getBestQuoteDetail = async (quote_id) => {
  const response = await axiosInstance.get(`/challenges/${quote_id}`);
  return response.data;
};

/**
 * 베스트 도전 quote_id를 가진 글 삭제
 * @param {number} quote_id
 * @returns
 */
export const deleteQuote = async (quote_id) => {
  const response = await axiosInstance.delete(`/challenges/${quote_id}`);
  return response.data;
};

/**
 * 베스트 도전 / 일반 글귀에서 type과 title로 검색
 * @param {string,string} param{}
 * @returns
 */
export const searchQuote = async ({ params = {} }) => {
  const { type, title } = params;
  const queryParams = new URLSearchParams();

  const response = await axiosInstance.get(
    `/challenges/search?${queryParams.toString()}`,
    {
      type,
      title,
    }
  );
  return response.data;
};

/**
 * 모든 일반 글귀 조회
 * @returns
 */
export const getAllQuoteList = async () => {
  const response = await axiosInstance.get("/quotes");
  return response.data;
};

/**
 * 일반 글귀 중 quote_id를 가진 글 조회
 * @param {number} quote_id
 * @returns
 */
export const getQuoteDetail = async (quote_id) => {
  const response = await axiosInstance.get(`/quotes/${quote_id}`);
  return response.data;
};

/**
 * 일반 글귀 좋아요 요청
 * @param {number} quote_id??
 * @returns
 */
export const likeNormalQuote = async () => {
  const response = await axiosInstance.put("/quotes");
  return response.data;
};

// 일반 글귀 검색 , 검색 하나로 만들고 type에 따라 결과를 다르게?
// export const searchNormalQuote = async (type, title) => {
//   const response = await axiosInstance.get("/quotes/search", { type, title });
//   return response.data;
// };

/**
 * 회원의 마이 페이지 조회
 * @param {number} user_id
 * @returns {
 *  "id":number,
 *  "email":string,
 *  "nickname":string,
 *  "birthDate":"YYYY-MM-DD",
 *  "authority":string (USER)
 * }
 */
export const getUserInfo = async (user_id) => {
  const response = await axiosInstance.get(`/users/${user_id}`);
  return response.data;
};

/**
 * @param {number} user_id
 * @param {string} nickname
 * @param {Date} birthDate
 * @returns {
 *  "id":number,
 *  "email":string,
 *  "nickname":string,
 *  "birthDate":"YYYY-MM-DD",
 *  "authority":string (USER)
 *  }
 */
export const updateUserInfo = async (user_id, nickname, birthDate) => {
  const response = await axiosInstance.put(`/users/${user_id}`, {
    nickname,
    birthDate,
  });
  return response.data;
};

// 운세?
// todo

// 좋아한 글귀 보기 ??
// export const getUserLike = async (user_id) => {
//   const response = await axiosInstance.get("/");
// };

/**
 * 특정 name을 가진 친구 검색
 * @param {string} name
 * @param {number} page [default : 0]
 * @param {number} size [default : 20]
 * @returns
 */
export const searchFriends = async (name, page = 0, size = 20) => {
  const response = await axiosInstance.get(`/friends/search/${name}`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

/**
 * friend_id를 가진 친구에게 추가 요청
 * @param {number} user_id [친구 추가를 요청하는 사용자ID]
 * @param {number} friend_id [친구로 추가할 사용자ID]
 * @returns
 */
export const addFriends = async (user_id, friend_id) => {
  const response = await axiosInstance.post(`/friends/${user_id}/${friend_id}`);
  return response.data;
};

/**
 * 유저(나)가 팔로우한 친구를 조회
 * @param {number} user_id
 * @param {number} page [default : 0]
 * @param {number} size [default : 20]
 * @returns
 */
export const getFollowList = async (user_id, page = 0, size = 20) => {
  const response = await axiosInstance.get(`/friends/follow/${user_id}`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

/**
 * 유저(나)를 팔로워한 친구를 조회
 * @param {number} user_id
 * @param {number} page [default : 0]
 * @param {number} size [default : 20]
 * @returns
 */
export const getFollowerList = async (user_id, page = 0, size = 20) => {
  const response = await axiosInstance.get(`/friends/follower/${user_id}`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

/**
 * 친구 목록에서 특정 친구 삭제
 * @param {number} user_id
 * @returns
 */
export const deleteFriends = async (user_id) => {
  const response = await axiosInstance.delete(`/friends/${user_id}`);
  return response.data;
};

/**
 * 메세지 전송
 */
export const postMessage = async () => {
  const response = await axiosInstance.post("/messages");
  return response.data;
};

/**
 * 내가 받은 메세지 조회
 * @param {number} user_id
 * @returns
 */
export const getReceiveMessage = async (user_id) => {
  const response = await axiosInstance.get(`/receive/${user_id}`);
  return response.data;
};

/**
 * 내가 보낸 메세지 조회
 * @param {number} user_id
 * @returns
 */
export const getPostMessage = async (user_id) => {
  const response = await axiosInstance.get(`/post/${user_id}`);
  return response.data;
};

/**
 * 특정 메세지 조회
 * @param {number} message_id
 * @returns
 */
export const getSpecificMessage = async (message_id) => {
  const response = await axiosInstance.get(`/${message_id}`);
  return response.data;
};

/**
 * 메세지 삭제
 * @param {number} message_id
 * @returns
 */
export const deleteMessage = async (message_id) => {
  const response = await axiosInstance.delete(`/${message_id}`);
  return response.data;
};

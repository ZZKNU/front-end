import axiosInstance from "./axiosInstance";
import { useAuthStore } from "../store";

/**
 * @post
 * 로그인 요청 API
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const getLogin = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  const { accessToken } = response.data;
  useAuthStore.getState().setTokens(accessToken);
  return response.data;
};

/**
 * @post
 * 회원가입 API
 * @param {string} email
 * @param {string} password
 * @param {string} nickname
 * @param {Date} birthdate
 * @returns
 */
export const getJoin = async (email, password, nickname, birthdate) => {
  const response = await axiosInstance.post("/auth/join", {
    email,
    password,
    nickname,
    birthdate,
  });
  const { accessToken } = response.data;
  useAuthStore.getState().setTokens(accessToken);
  return response.data;
};

/**
 * @get
 * 닉네임 중복 체크
 * @param {string} nickname
 * @return {boolean} TRUE/FALSE
 */
export const getCheckNickname = async (nickname) => {
  const response = await axiosInstance.get(`/auth/nickname/${nickname}`, {
    params: {
      nickname: nickname,
    },
  });
  return response.data;
};

/**
 * @get
 * 이메일 중복 체크
 * @param {string} email
 * @return {boolean} TRUE/FALSE
 */
export const getCheckEmail = async (email) => {
  const response = await axiosInstance.get(`/auth/email/${email}`, {
    params: {
      email: email,
    },
  });
  return response.data;
};
/**
 * @delete
 * 회원탈퇴 API
 * @param {string} accessToken
 * @returns
 */
export const deleteUser = async () => {
  const response = await axiosInstance.delete(`/users`);
  return response.data;
};

/**
 * @post
 * 베스트 도전 목록에서 글 작성
 * @param {string} title
 * @param {string} content
 * @param {string} quoteType
 * @param {string} author
 * @returns
 */
export const writeBestQuote = async (title, quoteType, content, author) => {
  const response = await axiosInstance.post("/challenges", {
    title,
    quoteType,
    content,
    author,
  });
  return response.data;
};

/**
 * @put
 * 베스트 도전에서 작성한 글 수정
 * @param {string} title
 * @param {string} content
 * @param {string} quoteType
 * @param {string} author
 * @returns
 */
export const editBestQuote = async (id, title, quoteType, content, author) => {
  const response = await axiosInstance.put("/challenges", {
    id,
    title,
    quoteType,
    content,
    author,
  });
  return response.data;
};

/**
 * @get
 * 베스트 도전 글 조회
 * @returns
 */
export const getBestQuoteList = async (params) => {
  const response = await axiosInstance.get("/challenges", {
    params,
  });
  return response.data;
};

/**
 * @put
 * 베스트 도전 좋아요 요청
 * @param {number} id
 * @returns
 */
export const likeBestQuote = async (id) => {
  const response = await axiosInstance.put(`/challenges/${id}`);
  return response.data;
};

/**
 * @get
 * 베스트 도전 quote_id를 가진 글 조회
 * @param {number} quote_id
 * @returns
 */
export const getBestQuoteDetail = async (quote_id) => {
  const response = await axiosInstance.get(`/challenges/${quote_id}`);
  return response.data;
};

/**
 * @delete
 * 베스트 도전 quote_id를 가진 글 삭제
 * @param {number} quote_id
 * @returns
 */
export const deleteQuote = async (quote_id) => {
  const response = await axiosInstance.delete(`/challenges/${quote_id}`);
  return response.data;
};

/**
 * @get
 * 베스트 도전 / 일반 글귀에서 type과 title로 검색
 * @param {string} author
 * @returns
 */
export const searchQuote = async (author) => {
  const response = await axiosInstance.get(
    `/challenges/search?author=${author}`
  );
  return response.data;
};

/**
 * @get
 * 모든 일반 글귀 조회
 * @returns
 */
export const getAllQuoteList = async (params) => {
  const response = await axiosInstance.get("/quotes", {
    params,
  });
  return response.data;
};

/**
 * @get
 * 일반 글귀 중 quote_id를 가진 글 조회
 * @param {number} quote_id
 * @returns
 */
export const getQuoteDetail = async (quote_id) => {
  const response = await axiosInstance.get(`/quotes/${quote_id}`);
  return response.data;
};

/**
 * @put
 * 일반 글귀 좋아요 요청
 * @param {number} quote_id??
 * @returns
 */
export const likeNormalQuote = async (id) => {
  const response = await axiosInstance.put(`/quotes/${id}`);
  return response.data;
};

// 일반 글귀 검색 , 검색 하나로 만들고 type에 따라 결과를 다르게?
// export const searchNormalQuote = async (type, title) => {
//   const response = await axiosInstance.get("/quotes/search", { type, title });
//   return response.data;
// };

/**
 * @get
 * 회원의 마이 페이지 조회
 * @param {string} accessToken
 * @returns {
 *  "accessToken":string,
 *  "email":string,
 *  "nickname":string,
 *  "birthDate":"YYYY-MM-DD",
 *  "authority":string (USER)
 * }
 */
export const getUserInfo = async () => {
  const response = await axiosInstance.get(`/users`);
  return response.data;
};

/**
 * @put
 * 회원의 개인정보 수정
 * @param {string} accessToken
 * @param {string} nickname
 * @param {Date} birthDate
 * @returns {
 *  "accessToken":string,
 *  "email":string,
 *  "nickname":string,
 *  "birthDate":"YYYY-MM-DD",
 *  "authority":string (USER)
 *  }
 */
export const updateUserInfo = async (nickName, birthDate) => {
  const response = await axiosInstance.put(`/users`, {
    nickName,
    birthDate,
  });
  return response.data;
};

// 운세?
// todo

/**
 * @get
 * 유저가 좋아요한 글 목록
 * @return
 */
export const getUserLike = async () => {
  const response = await axiosInstance.get("/users/liked");
  return response.data;
};

/**
 * @get
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
 * @post
 * friend_id를 가진 친구에게 추가 요청
 *
 * @param {number} friend_id [친구로 추가할 사용자ID]
 * @returns
 */
export const addFriends = async (friend_id) => {
  const response = await axiosInstance.post(`/friends/${friend_id}`, null, {
    params: {
      friend_id: friend_id,
    },
  });
  return response.data;
};

/**
 * @get
 * 유저(나)가 팔로우한 친구를 조회
 * @param {number} page [default : 0]
 * @param {number} size [default : 20]
 * @returns
 */
export const getFollowList = async (page = 0, size = 20) => {
  const response = await axiosInstance.get(`/friends/follow`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

/**
 * @get
 * 유저(나)를 팔로워한 친구를 조회
 *
 * @param {number} page [default : 0]
 * @param {number} size [default : 20]
 * @returns
 */
export const getFollowerList = async (page = 0, size = 20) => {
  const response = await axiosInstance.get(`/friends/follower`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

/**
 * @delete
 * 친구 목록에서 특정 친구 삭제
 * @param {number} id
 * @returns
 */
export const deleteFriends = async (id) => {
  const response = await axiosInstance.delete(`/friends/${id}`);
  return response.data;
};

/**
 * @post
 * 메세지 전송
 * @param {number} to_id
 */
export const postMessage = async (to_id, quote_id, title) => {
  const response = await axiosInstance.post(`/messages/${to_id}`, {
    quote_id: quote_id,
    title: title,
  });
  return response.data;
};

/**
 * @get
 * 내가 받은 메세지 조회
 * @param {string} accessToken
 * @returns
 */
export const getReceiveMessage = async () => {
  const response = await axiosInstance.get(`/messages/receive`);
  return response.data;
};

/**
 * @get
 * 내가 보낸 메세지 조회
 * @param {string} accessToken
 * @returns
 */
export const getPostMessage = async () => {
  const response = await axiosInstance.get(`/messages/post`);
  return response.data;
};

/**
 * @get
 * 특정 메세지 조회
 * @param {number} message_id
 * @returns
 */
export const getSpecificMessage = async (message_id) => {
  const response = await axiosInstance.get(`/messages/${message_id}`);
  return response.data;
};

/**
 * @delete
 * 메세지 삭제
 * @param {number} message_id
 * @returns
 */
export const deleteMessage = async (message_id) => {
  const response = await axiosInstance.delete(`/messages/${message_id}`);
  return response.data;
};

/**
 * @put
 * 베스트 도전 글을 일반 글로 승격
 * @param {number} quote_id
 * @returns
 */
export const promoteQuote = async (quote_id) => {
  const response = await axiosInstance.put(`/admin/promotion/${quote_id}`);
  return response.data;
};

/**
 * @put
 * 일반 유저를 관리자로 승격
 * @param {number} user_id
 * @returns
 */
export const authorityUser = async (user_id, auth) => {
  const response = await axiosInstance.put(
    `/admin/authority/${user_id}`,
    JSON.stringify(auth),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

/**
 * @get
 * 존재하는 사용자의 목록 가져오기
 * @returns
 */
export const getUserList = async () => {
  const response = await axiosInstance.get(`/admin/userList`);
  return response.data;
};

/**
 * @get
 * 승격 가능한 글 목록 가져오기
 * @returns
 */
export const possiblePromoteList = async () => {
  const response = await axiosInstance.get(`/admin/challenges`);
  return response.data;
};

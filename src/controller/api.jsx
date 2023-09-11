import { getRecoil, setRecoil } from "recoil-nexus";
import { userState } from "../recoil/user";
import axios from "axios";
// export const backendUrl = "http://3.35.132.189:4000/";
export const backendUrl = "http://192.168.106.89:4000/";
const getUserOutsideOfRecoil = () => {
  return getRecoil(userState);
};

const getRequest = async path => {
  return axios.get(backendUrl + path);
};

const getUri = path => {
  return backendUrl + path;
};

const postRequest = async (path = {}, body = {}, options = {}) => {
  let { token } = getUserOutsideOfRecoil(userState);
  let payload = {
    token: token,
    ...body,
  };

  return axios.post(backendUrl + path, payload, options);
};

export const getAuthKakaoLoginUri = () => {
  return getUri("auth/kakao/login");
};

export const getAuthKakaoLogoutUri = () => {
  return getUri("auth/kakao/logout");
};

export const authKakaoLoginVerify = data => {
  return postRequest("auth/kakao/loginVerify", data);
};

export const getGarden = (lat, lng, distance) => {
  let body = {
    latitude: lat,
    longitued: lng,
    distance: distance,
  };
  return postRequest("find/getBuildings", body);
};

export const getUserInfo = token => {
  return postRequest("user/getUserInfo", {
    token: token,
  });
};
export const getGardenInfo = token => {
  return postRequest("garden/getGardenInfo", {
    token: token,
  });
};

export const setGardenInfo = garden_id => {
  return postRequest("garden/setGardenInfo", {
    garden_id: garden_id,
  });
};

export const setGardenLog = data => {
  return postRequest("garden/setGardenLog", data);
};
export const getGardenLog = data => {
  return postRequest("garden/getGardenLog", data);
};

export const joinGarden = data => {
  return postRequest("garden/joinGarden", data);
};
export const antiJoinGarden = data => {
  return postRequest("garden/antiJoinGarden", data);
};
export const deleteGardenMember = data => {
  return postRequest("garden/deleteGardenMember", data);
};
export const regenerateInviteCode = data => {
  return postRequest("garden/regenerateInviteCode", data);
};

export const setBoard = (title, content, type) => {
  let data = {
    title: title,
    description: content,
    type: type,
  };
  return postRequest("community/setBoard", data);
};

export const getBoard = (pageNum, type, search) => {
  let data = {
    page: pageNum,
    type: type,
    search: search,
  };
  return postRequest("community/getBoard ", data);
};
export const changeNickname = data => {
  return postRequest("user/changeNickname", data);
};

export const setReply = (boardId, des) => {
  let data = {
    board_id: boardId,
    description: des,
  };
  return postRequest("community/setReply", data);
};

export const getReply = boardId => {
  let data = {
    board_id: boardId,
  };
  return postRequest("community/getReply", data);
};

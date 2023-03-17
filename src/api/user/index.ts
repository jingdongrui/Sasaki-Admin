import request from "@/utils/request";

export const getLogin = (data?: Object) =>
  request({ url: "/api/user/login", method: "POST", data });
export const getUserInfo = (data?: Object) =>
  request({ url: "/api/user/getUserInfo", method: "POST", data });
export const getUserNotice = (data?: Object): Promise<NoticeType.NoticePromise> =>
  request({ url: "/api/user/getUserNotice", method: "POST", data });

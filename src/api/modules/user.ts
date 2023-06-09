import request from "@/utils/request";
import { ResultData, Login } from "../interface/index";

export const getLogin = (data: Login.ReqLogin): Promise<ResultData<Login.ResLogin>> =>
  request({ url: "/api/user/login", method: "POST", data });

export const getUserInfo = (data?: Object) =>
  request({ url: "/api/user/getUserInfo", method: "POST", data });
export const getUserNotice = (data?: Object): Promise<NoticeType.NoticePromise> =>
  request({ url: "/api/user/getUserNotice", method: "POST", data });
export const getUserList = (data?: Object): Promise<any> =>
  request({ url: "/api/user/getUserList", method: "POST", data });

// * 请求响应参数(不包含data)
export interface Result {
  code: string;
  msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T;
}

// * 登录模块
export namespace Login {
  export interface ReqLogin {
    username: string;
    password: string;
  }
  export interface ResLogin {
    accessToken: string;
    userInfo: {
      id: string;
      name: string;
      age: string | number;
      roles: string[];
      birthday: string;
    };
    menusList: any[];
  }
}

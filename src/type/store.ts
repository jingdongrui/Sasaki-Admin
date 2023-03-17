/**
 * pinia 类型定义
 */

// 用户信息
export interface UserState {
  userinfo: {
    name: string;
  };
  menuList: Menu[];
}

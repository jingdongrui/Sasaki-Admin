/**
 * 全局类型声明
 */

// 路由，菜单项配置
declare interface Menu {
  path: string;
  name: string;
  component?: string | (() => Promise<any>);
  redirect?: string;
  meta: RouteMeta;
  children?: Menu[];
}
declare interface RouteMeta {
  // name
  title: string;
  // 图标
  icon?: string;
  // 是否为默认活跃路由
  isActivePath?: boolean;
  // 是否显示在tag导航栏
  isAffix?: boolean;
  // 是否缓存
  isKeepAlive?: boolean;
  // isLink?: string;
  // isHide?: boolean;
  // isFull?: boolean;
}

// 通知数据
declare namespace NoticeType {
  interface NoticePromise {
    msg: string;
    code: number;
    data: Array<NoticeData>;
  }

  interface NoticeData {
    key: string;
    name: string;
    list: [
      {
        avatar: string;
        title: string;
        datetime: string;
        description: string;
        type: string;
        extra?: string;
        status?: string;
      }
    ];
  }
}

// TagNav
declare interface TagNavItem {
  path: string;
  meta: any;
}
// 鼠标滚轮滚动类型
// declare interface WheelEventType extends WheelEvent {
// 	wheelDelta: number;
// }

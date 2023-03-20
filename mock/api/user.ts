// https://github.com/vbenjs/vite-plugin-mock/blob/HEAD/README.zh_CN.md
import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
export default [
  // 登录
  {
    url: "/api/user/login",
    method: "post",
    timeout: 2000,
    response: {
      code: 2000,
      msg: "ok",
      data: {
        access_token: Mock.mock("@word(24)")
      }
    }
  },
  // 用户信息
  {
    url: "/api/user/getUserInfo",
    method: "post",
    timeout: 10,
    response: {
      code: 2000,
      msg: "ok",
      data: {
        user_info: {
          id: new Date(),
          name: Mock.mock("@cname"), // 中文名称
          age: Mock.mock("@natural( 18, 80 )"), // 18至28以内随机整数, 0只是用来确定类型
          roles: ["admin"],
          birthday: Mock.mock('@date("yyyy-MM-dd")') // 日期
        },
        menusList: [
          {
            path: "/home",
            name: "home",
            component: "/home/index",
            meta: {
              title: "首页",
              icon: "ssk-home",
              activeItem: true,
              isAffix: true
            }
          },
          {
            path: "/system",
            name: "system",
            meta: {
              title: "系统设置",
              icon: "ssk-setting"
            },
            redirect: "/system/user",
            children: [
              {
                path: "/system/user",
                name: "systemUser",
                component: "/system/menu/index",
                meta: {
                  title: "用户管理",
                  icon: "ssk-user"
                }
              },
              {
                path: "/system/department",
                name: "systemDepartment",
                component: "/system/role/index",
                meta: {
                  title: "部门管理",
                  icon: "ssk-team"
                }
              }
            ]
          },
          {
            path: "/components",
            name: "components",
            meta: { title: "组件", icon: "ssk-build" },
            redirect: "/components/component1",
            children: [
              {
                path: "/components/component1",
                name: "componentsComponent1",
                meta: { title: "component1", icon: "ssk-HTML" },
                component: "/system/role/index"
              },
              {
                path: "/components/component2",
                name: "componentsComponent2",
                meta: { title: "component2", icon: "ssk-apple" },
                component: "/system/role/index"
              }
            ]
          },
          {
            path: "/test",
            name: "test",
            component: "/test/index",
            meta: {
              title: "Test",
              icon: "ssk-HTML"
            }
          }
        ]
      }
    }
  },
  // 通知
  {
    url: "/api/user/getUserNotice",
    method: "post",
    timeout: 10,
    response: {
      code: 2000,
      msg: "ok",
      data: [
        {
          key: "1",
          name: "通知",
          list: [
            {
              avatar: "https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF",
              title: "你收到了 12 份新周报",
              datetime: "一年前",
              description: "",
              type: "1"
            },
            {
              avatar: "https://t7.baidu.com/it/u=1517419723,1472324058&fm=193&f=GIF",
              title: "你推荐的 前端 已通过第三轮面试",
              datetime: "一年前",
              description: "",
              type: "1"
            },
            {
              avatar: "https://t7.baidu.com/it/u=1517419723,1472324058&fm=193&f=GIF",
              title: "模板可以区分",
              datetime: "一年前",
              description: "",
              type: "1"
            },
            {
              avatar: "https://t7.baidu.com/it/u=1517419723,1472324058&fm=193&f=GIF",
              title: "左侧图标",
              datetime: "一年前",
              description: "",
              type: "1"
            }
          ]
        },
        {
          key: "2",
          name: "消息",
          list: []
        },
        {
          key: "3",
          name: "代办",
          list: [
            {
              avatar: "",
              title: "软考中级",
              description: "该复习了",
              datetime: "",
              extra: "未开始",
              status: "info",
              type: "3"
            },
            {
              avatar: "",
              title: "软考高级",
              description: "可以准备了",
              datetime: "",
              extra: "马上到期",
              status: "danger",
              type: "3"
            }
          ]
        }
      ]
    }
  }
] as MockMethod[];

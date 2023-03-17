export default [
  {
    url: "/api/login", // 模拟登录的链接
    type: "post", // 请求方式
    timeout: 500, // 超时时间
    statusCode: 200, // 返回的http状态码
    response: {
      // 返回的结果集
      code: 200,
      message: "登录成功",
      data: {
        name: "tom"
      }
    }
  },

  {
    type: "get",
    url: "/user/menu",
    response: () => {
      return {
        menusList: [
          {
            id: "/sysManagent",
            title: "系统管理",
            subMenuList: [
              {
                id: "/userList",
                title: "用户管理",
                path: "/user/manage"
              },
              {
                id: "/roleList",
                title: "角色管理",
                path: "/user/role"
              },
              {
                id: "/permissionList",
                title: "权限管理",
                path: "/user/permission"
              }
            ]
          },
          {
            id: "businessManagent",
            title: "业务管理",
            subMenuList: [
              {
                id: "/businessList",
                title: "业务逻辑"
              }
            ]
          }
        ],
        statusCode: 200
      };
    }
  }
];

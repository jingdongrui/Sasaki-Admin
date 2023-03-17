// https://github.com/vbenjs/vite-plugin-mock/blob/HEAD/README.zh_CN.md
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs';
import user from "./api/user";
export default [user]
// export default [
//   {
//     url: '/api/user/login',
//     method: 'post',
//     timeout: 2000,
//     response: {
//       code: 2000,
//       msg: "ok",
//       data: {
//         access_token: Mock.mock('@word(24)'),
//         user_info: {
//           name: Mock.mock('@cname'), // 中文名称
//           age: Mock.mock('@natural( 18, 80 )'), // 18至28以内随机整数, 0只是用来确定类型
//           roles: ["admin"],
//           birthday: Mock.mock('@date("yyyy-MM-dd")'), // 日期
//         },
//       },
//     },
//   },
//   {
//     url: '/api/post',
//     method: 'post',
//     timeout: 2000,
//     response: {
//       code: 0,
//       data: {
//         name: 'vben',
//       },
//     },
//   },
//   {
//     url: '/api/text',
//     method: 'post',
//     rawResponse: async (req, res) => {
//       let reqbody = ''
//       await new Promise((resolve) => {
//         req.on('data', (chunk) => {
//           reqbody += chunk
//         })
//         req.on('end', () => resolve(undefined))
//       })
//       res.setHeader('Content-Type', 'text/plain')
//       res.statusCode = 200
//       res.end(`hello, ${reqbody}`)
//     },
//   },
// ] as MockMethod[]
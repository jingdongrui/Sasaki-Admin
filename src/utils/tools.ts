/**
 * 树 转 列表 扁平化数组
 * @param {Array} arr 树状数据
 * @param {Array} result 结果
 * @param {String} childKey childKey = "children"
 * @returns 列表数组
 */
export const treeToArray = (arr: any[], childKey = "children", result: any[] = []) => {
  for (const item of arr) {
    result.push(item);
    if (item[childKey].length > 0) {
      treeToArray(item[childKey], "children", result);
    }
  }
  return result;
};
/**
 * 树 转 列表
 * 广度优先，先进先出
 * @param {Array} tree 树状数据
 * @param {String} childKey children的key
 */
export function treeToList(tree: Array<any>, childKey = "children") {
  let stack = tree.concat([]);
  let data = [];
  while (stack.length !== 0) {
    // 从stack中拿出来分析
    let shift = stack.shift(); // stack.pop()  先进后出
    data.push(shift);
    let children = shift[childKey];
    if (children) {
      for (let i = 0; i < children.length; i++) {
        // 把数据放入stack中
        stack.push(children[i]);
      }
    }
  }
  return data;
}

/**
 * @description 扁平化数组对象
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList: Menu[]) {
  let newMenuList: Menu[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce((pre: Menu[], current: Menu) => {
    let flatArr = [...pre, current];
    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
    return flatArr;
  }, []);
}
/**
 * 通过菜单列表递归找出每个路由的层级关系（面包屑导航）
 * @param menuList 后端请求的菜单列表
 * @param result   要返回的结果
 * @param parent   父级
 */
export const getAllBreadcrumbList = (
  menuList: Menu[],
  result: { [key: string]: any } = {},
  parent = []
) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];

    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
  }
  return result;
};

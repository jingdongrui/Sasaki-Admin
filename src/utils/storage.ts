
/**
 * window.localStorage 
 * @method set 设置本地存储
 * @method get 获取本地存储
 * @method remove 移除本地存储
 * @method clear 清除全部本地存储
 */
export const local_storage = {
  set (key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  get (key: string) {
    return JSON.parse(window.localStorage.getItem(key) as string)
  },
  remove (key: string) {
    window.localStorage.removeItem(key)
  },
  clear () {
    window.localStorage.clear()
  }
}

/**
 * window.sessionStorage
 * @method set 设置本地存储
 * @method get 获取本地存储
 * @method remove 移除本地存储
 * @method clear 清除全部本地存储
 */
export const session_storage = {
  set (key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  get (key: string) {
    return JSON.parse(window.sessionStorage.getItem(key) as string)
  },
  remove (key: string) {
    window.sessionStorage.removeItem(key)
  },
  clear () {
    window.sessionStorage.clear()
  }
}
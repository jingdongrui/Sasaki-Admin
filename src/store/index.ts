import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()
//持久化插件
pinia.use(piniaPluginPersistedstate)
// 导出pinia
export default pinia












# Vue项目配置

## 一、配置文件

### .env文件配置

1. 文件说明

    `.env` 全局默认配置文件，不论什么环境都会加载合并

    `.env.development` 开发环境下的配置文件

    `.env.production` 生产环境下的配置文件

    以上三个文件的文件名是固定的，不能乱取。其他的可以自定义例如：`.env.devtest`做测试环境

2. 文件内容

    PS：除了`NODE_ENV`属性，其他属性名必须以`VUE_APP_`开头，例如：`VUE_APP_XXX`
        vite中以`VITE_`开头，例如：`VITE_PORT=9000`

    ```shell
    # ./.env.development
    # webpack
    NODE_ENV = development
    VUE_APP_URL = https://www.baidu.com/
    VUE_APP_TITLE = Admin

    # vite
    VITE_URL = https://www.baidu.com/
    VITE_APP_TITLE = Admin
    ```

3. 文件加载
    文件加载顺序：

    开发环境加载 `.env` 和 `.env.development`

    生成环境加载 `.env` 和 `.env.production`

    XXX环境加载 `.env` 和 `.env.xxx`

    `.env`不管什么环境都会第一个加载，若后加载的`.env.xxx`文件有相同的配置属性，后加载的会替换之前的。

4. 文件使用
    在`package.json`文件中，需要哪个环境，就执行哪个环境

    ```json
      "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint",
        "xxx": "vue-cli-service serve --mode xxx"
      },
    ```

    执行npm run xxx

    获取配置的值可通过：`process.env.xxx` 获取,

    vite 通过`import.meta.env`获取环境变量

    `npm run serve` 默认运行development
总结：需要xxx环境，就npm run xxx，获取对应的环境变量

### vue.config.js

  `vue.config.js` 是一个可选的配置文件，
  如果项目的 (和 `package.json` 同级的) 根目录中存在这个文件，
  那么它会被 `@vue/cli-service` 自动加载。
  [vue.config.js配置文件详解](https://cli.vuejs.org/zh/config/#vue-config-js "最详细")

  PS：`vue.config.js` webpack搭建才有

### tsconfig.json

  如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。

  [tsconfig.json配置文件](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

### .eslintrc.js

  ESLint配置

  默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。
  如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。
  为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。
  ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。

### prettier.config.js

  prettier代码格式化配置文件

### babel.config.js

1

### .eslintignore

  ESLint忽略文件

### vite.config.ts/js

  使用 vite 创建项目完成后会自动生成 一个 vite.config.js/ts， webpack则为vue.config.ts/js

### 1

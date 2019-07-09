# hmi-web

hmi-web by

## Getting Started

### Installation

如果想用 vscode 编译、调试代码，必须全局安装 ts-node 和 nodemon

```
# install global pack with npm
npm i ts-node -g
npm i nodemon -g
```
若不想用 vscode，直接 `npm install`
```
# install dependencies module with npm
npm install
```


### Usage
```javascript
# build
npm run build
# start
npm run start
# watch
npm run watch-serve
# debugger
npm run debugger
```
- watch
```javascript
/*
 * --watch ./src                    监听 ./src 目录下的所有文件
 * -e ts,tsx                        指定需要扩展的文件类型 ts 和 tsx，用逗号分隔
 * --exec ts-node ./src/server.ts   执行 "ts-node ./src/server.ts" 命令
 */
nodemon --watch ./src -e ts,tsx --exec ts-node ./src/server.ts
```

- debugger
```javascript
/*
 * --exec node --inspect -r ts-node/register  执行 "node --inspect -r ts-node/register" 命令
 * node --inspect -r ts-node/register         使用node预加载ts-node的register模块用来运行ts程序，并且开启debugger模式（调试协议为 inspector）。
 */
nodemon --watch ./src -e ts,tsx --exec node --inspect -r ts-node/register ./src/server.ts
```

# License
MIT


<!-- # Doc
[ts-node](https://www.npmjs.com/package/ts-node)  
[nodemon](https://www.npmjs.com/package/nodemon)  
[详解如何用typescript开发koa2的二三事](https://www.jb51.net/article/150733.htm)
[Why does the node inspector not start when I am using nodemon and ts-node?](https://stackoverflow.com/questions/49042830/why-does-the-node-inspector-not-start-when-i-am-using-nodemon-and-ts-node)  
[What's the difference between requiring ts-node and ts-node/register](https://stackoverflow.com/questions/53802105/whats-the-difference-between-requiring-ts-node-and-ts-node-register) -->
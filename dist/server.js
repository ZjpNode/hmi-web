"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const mongodb_1 = require("./mongodb"); // 引入mongodb
const user_1 = require("./mongodb/controllers/user"); // 引入info controller
mongodb_1.db(); // 链接数据库并且初始化数据模型
const app = new koa_1.default();
const router = new koa_router_1.default();
router.get('/test', (ctx, next) => {
    ctx.body = "test page";
});
router.get('/student', user_1.fetchInfo);
app.use(router.routes());
app.listen(3000);
console.log('Server running on port 3000');
//# sourceMappingURL=server.js.map
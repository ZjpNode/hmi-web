import Koa from 'koa';

import Router from 'koa-router';
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'

import { db } from './mongodb' // 引入mongodb

db() // 链接数据库并且初始化数据模型

const GraphqlRouter = require('./router/idnex')

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

router.use('', GraphqlRouter.routes())

app.use(router.routes());

app.listen(3000);



console.log('Server running on port 3000');
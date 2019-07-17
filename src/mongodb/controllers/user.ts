import Koa from 'koa';
import Router from 'koa-router';

import mongoose from 'mongoose'
const Info = mongoose.model('userInfo')

// 获取所有的info数据
export const fetchInfo = async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
    const infos = await Info.find({}) // 数据查询
    if (infos.length) {
        ctx.body = {
            success: true,
            info: infos
        }
    } else {
        ctx.body = {
            success: false
        }
    }
}
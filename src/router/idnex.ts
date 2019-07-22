import Koa from 'koa';
import Router from 'koa-router';

import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import { fetchInfo } from '../controllers/user'

import schema from '../graphql/schema'


const router = require('koa-router')()

router.get('/student', fetchInfo)
    .post('/graphql', async (ctx: any, next: any) => {
        await graphqlKoa({ schema: schema })(ctx, next) // 使用schema
    })
    .get('/graphql', async (ctx: any, next: any) => {
        await graphqlKoa({ schema: schema })(ctx, next) // 使用schema
    })
    .get('/graphiql', async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
        await graphiqlKoa({ endpointURL: '/graphql' })(ctx)
    })
module.exports = router
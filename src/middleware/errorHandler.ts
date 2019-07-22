import Koa from 'koa';

function getUrl(status: number) {
    let url: string
    switch (status) {
        case 401: url = '/401.html'; break;
        case 404: url = '/404.html'; break;
        case 500: url = '/500.html'; break;
        case 502: url = '/502.html'; break;
        default:
            if (status < 500) {
                url = '/40x.html';
            } else {
                url = '/50x.html';
            }
    }
    return url;
}

export default async (err: any, ctx: Koa.Context) => {

    // 未知异常状态，默认使用 500
    if (!err.status) err.status = 500;
    ctx.status = err.status;

    // 获取客户端请求接受类型
    let acceptedType = ctx.accepts('html', 'text', 'json');

    switch (acceptedType) {
        case 'text':
            ctx.type = 'text/plain';
            ctx.body = err.message;
            break;
        case 'json':
            ctx.type = 'application/json';
            ctx.body = { error: err.message }
            break;
        case 'html':
        default:
            // 默认返回页面
            ctx.type = 'text/html';
            await ctx.redirect(getUrl(err.status));

            break;
    }
}
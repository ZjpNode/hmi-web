// 引入GraphQL各种方法类型

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    isOutputType
} from 'graphql';

import mongoose from 'mongoose'
const Info = mongoose.model('userInfo') // 引入Info模块

// 定义Info的数据类型
let InfoType = new GraphQLObjectType({
    name: 'Info',
    fields: {
        _id: {
            type: GraphQLID
        },
        height: {
            type: GraphQLString
        },
        weight: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        hobby: {
            type: new GraphQLList(GraphQLString)
        },
    }
})

// 批量查询
const infos = {
    type: new GraphQLList(InfoType),
    args: {},
    resolve() {
        return Info.find({}).exec() // 数据库查询
    }
}

// 根据id查询单条info数据

const info = {
    type: InfoType,
    // 传进来的参数
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID) // 参数不为空
        }
    },
    resolve(root: any, params: any) {
        console.log(root)
        return Info.findOne({ _id: params.id }).exec() // 查询单条数据
    }
}

// 导出GraphQLSchema模块

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Queries',
        fields: {
            infos,
            info
        }
    })
})
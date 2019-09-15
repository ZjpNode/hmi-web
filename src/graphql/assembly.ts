// 引入GraphQL各种方法类型

import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { GraphQLJSON } from 'graphql-type-json';

import assemblyModel from '../mongodb/scheme/assembly'

// const assemblyModel = mongoose.model('assembly') // 引入 assembly 模块

// 定义Info的数据类型
let assemblyType = new GraphQLObjectType({
    name: 'assembly',
    fields: {
        _id: {
            type: GraphQLID
        },
        version: {
            type: GraphQLString
        },
        objects: {
            type: new GraphQLList(GraphQLJSON)
        }
    }
})

// 批量查询
export const assemblys = {
    type: new GraphQLList(assemblyType),
    args: {},
    resolve() {
        return assemblyModel.find({}).exec() // 数据库查询
    }
}

// 根据id查询单条assembly数据

export const assembly = {
    type: assemblyType,
    // 传进来的参数
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID) // 参数不为空
        }
    },
    resolve(root: any, params: any) {
        return assemblyModel.findOne({ _id: params.id }).exec() // 查询单条数据
    }
}

export const addAssembly = {
    type: assemblyType,
    args: {
        version: { type: GraphQLString },
        objects: { type: new GraphQLList(GraphQLJSON) },
    },
    resolve(root: any, params: any) {
        const newAssemblyModel = new assemblyModel(params)
        return newAssemblyModel.save() // findOne({ _id: params.id }) // 查询单条数据
    }
}

// // 导出GraphQLSchema模块

// export default new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'Queries',
//         fields: {
//             infos,
//             info
//         }
//     })
// })
import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';
// 引入 type 
import { assembly, assemblys, addAssembly } from './assembly'
import { info, infos } from './schema'

// 建立 schema
export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Queries',
        fields: {
            infos,
            info,
            assembly,
            assemblys
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutations',
        fields: {
            addAssembly
        }
    })
})
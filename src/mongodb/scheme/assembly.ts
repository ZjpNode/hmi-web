// 引入mongoose
import mongoose from 'mongoose'

// 
const Schema = mongoose.Schema

// 实例 assemblySchema
const assemblySchema = new Schema({
    version: String,
    objects: String, // ？？？？？？？？？？？？
})

// 建立Info数据模型
export default mongoose.model('assembly', assemblySchema, 'assembly')
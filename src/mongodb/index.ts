import mongoose from 'mongoose'
import config from './config/idnex'

const { dbPath, user, pass } = config.testUserDB

// 同步引入 user model
require('./scheme/user')

export const db = () => {
    mongoose.set('debug', true)
    mongoose.connect(dbPath, { user, pass, useNewUrlParser: true })
    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.testUserDB.dbPath)
    })
    mongoose.connection.on('error', err => {
        console.error(err)
    })
    mongoose.connection.on('open', async () => {
        console.error('Connected to MongoDB', config.testUserDB.dbPath)
    })
}
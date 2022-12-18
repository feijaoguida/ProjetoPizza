import { app } from '../src/server'
import { router } from '../src/router'
import serverless from 'serverless-http'

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)


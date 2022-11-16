import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import { router } from './router'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

const app = express();
app.use(express.json())
app.use(cors())

app.use(
    '/docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
)

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'images'))
)

app.use((err: Error, req: Request, res: Response, nest: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const portServer = process.env.PORT || 3333

app.listen(portServer, () => console.log(`Servidor online na porta ${portServer}`)) 
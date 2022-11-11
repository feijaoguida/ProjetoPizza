import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { router } from './router'
import swaggerUi  from 'swagger-ui-express'

const app = express();
app.use(express.json())
app.use(cors())

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    }
  })
)

app.use(router);

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

app.listen(3333, () => console.log("Servidor online na porta 3333")) 
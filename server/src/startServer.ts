import { ZettelServices } from '@zettelooo/api-server'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { Data } from 'shared'

export function startServer(connection: ZettelServices.Ws.GetUpdates<Data>): void {
  const port = Number(process.env.PORT || 4000)

  const app = express()

  app.set('port', port)
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())

  app.use('/static', express.static(path.join(__dirname, '..', 'public')))

  // TODO: Your API implementation here

  app.listen(port, () => console.log(`Listening on port ${port}.`))
}

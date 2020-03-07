import express, { json, urlencoded, Router } from 'express'
import bodyParser from 'body-parser'
import { AppRouter } from './AppRouter'
import './controllers/TaskController'

const app = express()

app.use(json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(AppRouter.getInstance())

export const start = async () => {
  try {
    app.listen(8000, () => {
      // tslint:disable-next-line: no-console
      console.log('Server running on http://localhost:8000')
    })
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.log(e)
  }
}

import express, { json } from 'express'
import bodyParser from 'body-parser'
import connect from './db'
import { AppRouter } from './AppRouter'
import './controllers/TaskController'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(json())

app.use(AppRouter.getInstance())

export const start = async () => {
  try {
    const db = 'mongodb://localhost:27017/task-api'
    connect(db)
    app.listen(8000, () => {
      console.info('Server running on http://localhost:8000')
    })
  } catch (e) {
    console.error(e)
  }
}

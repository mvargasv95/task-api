import { Request, Response, NextFunction } from 'express'
import {
  get,
  post,
  put,
  remove,
  controller,
  bodyValidator,
  use
} from './decorators'
import Task from '../models/task.model'
import { Types } from 'mongoose'

const isIdValid = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params
  console.log('here', id)
  if (Types.ObjectId.isValid(id)) return next()
  res.status(400).send('Invalid Object ID')
}

@controller('/')
class TaskController {
  @get(':id')
  @use(isIdValid)
  async getTask(req: Request, res: Response) {
    const { id } = req.params
    try {
      const task = await Task.findById(id).exec()
      return res.status(200).json({ task })
    } catch (e) {
      console.error(e)
      return res.status(404).send('Not found')
    }
  }

  @post('/')
  @bodyValidator('title', 'description', 'complexity', 'status')
  async postTask(req: Request, res: Response) {
    const { title, description, complexity, status } = req.body
    try {
      const task = await Task.create({ title, description, complexity, status })
      return res.status(200).json({ task })
    } catch (e) {
      console.error(e)
      return res.status(400).send('Bad request')
    }
  }

  @remove(':id')
  removeTask(req: Request, res: Response) {}

  @put(':id')
  updateTask() {}

  @get('/')
  async getAll(req: Request, res: Response) {
    try {
      const tasks = await Task.find().exec()
      return res.json({ tasks })
    } catch (e) {
      console.error(e)
      return res
        .status(400)
        .send('Bad request')
        .end()
    }
  }
}

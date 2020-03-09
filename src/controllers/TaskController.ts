import { Request, Response, NextFunction } from 'express'
import { createClient } from 'redis'
import { Types } from 'mongoose'
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

const redis = createClient(6379, 'localhost')

// middlewares
const isIdValid = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params
  if (Types.ObjectId.isValid(id)) return next()
  res.status(400).send('Invalid task Id')
}

@controller('/')
class TaskController {
  @get(':id')
  @use(isIdValid)
  async getTask(req: Request, res: Response) {
    const { id } = req.params
    try {
      const task = await Task.findById(id).exec()
      if (!task) return res.status(400).send('Unable to find task')
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
  @use(isIdValid)
  async removeTask(req: Request, res: Response) {
    const { id } = req.params
    try {
      const task = await Task.findByIdAndRemove(id)
      if (!task) return res.status(404).send('Task not found')
      return res.status(200).json({ task })
    } catch (e) {
      console.error(e)
      return res.status(400).send('Bad request')
    }
  }

  @put(':id')
  @use(isIdValid)
  async updateTask(req: Request, res: Response) {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object)
      return res.status(400).send('No information to update')
    const { id } = req.params
    try {
      const task = await Task.findByIdAndUpdate(id, req.body, {
        new: true
      }).exec()
      if (!task) return res.status(400).send('Unable to update task')
      return res.status(200).json({ task })
    } catch (e) {
      console.error(e)
      return res.status(400).send('Bad request')
    }
  }

  @get('/')
  async getAll(req: Request, res: Response) {
    try {
      const tasks = await Task.find().exec()
      return res.json({ tasks })
    } catch (e) {
      console.error(e)
      return res.status(400).send('Bad request')
    }
  }
}

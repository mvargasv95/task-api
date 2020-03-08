import { Request, Response } from 'express'
import { get, post, put, remove, controller, bodyValidator } from './decorators'
import Task from '../models/task.model'

@controller('/')
class TaskController {
  @get(':id')
  getTask(req: Request, res: Response) {
    const { id } = req.params
    res.send(`id is ${id}`)
  }

  @post('/')
  @bodyValidator('title', 'description', 'complexity', 'status')
  postTask(req: Request, res: Response) {
    const { title, description, complexity, status } = req.body
    try {
      const task = Task.create({ title, description, complexity, status })
      return res.status(200).json({ task })
    } catch (e) {
      console.error(e)
      return res.status(400).end()
    }
  }

  @remove('/:id')
  removeTask(req: Request, res: Response) {}

  @put('/:id')
  updateTask() {}

  @get('/')
  getAll(req: Request, res: Response) {
    res.send('looks ok!')
  }
}

import { Request, Response } from 'express'
import { get, post, put, remove, controller } from './decorators'

@controller('/')
class TaskController {
  @get(':id')
  getTask(req: Request, res: Response) {
    const { id } = req.params
    res.send(`id is ${id}`)
  }

  @post('/')
  postTask(req: Request, res: Response) {}

  @remove('/:id')
  removeTask(req: Request, res: Response) {}

  @put('/:id')
  updateTask() {}

  @get('/')
  getAll(req: Request, res: Response) {
    res.send('looks ok!')
  }
}

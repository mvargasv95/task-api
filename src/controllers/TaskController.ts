import { Request, Response } from 'express'
import { get, post, put, remove } from './decorators'

class TaskController {
  @get('/:id')
  getTask(req: Request, res: Response) {}

  @post('/')
  postTask(req: Request, res: Response) {}

  @remove('/:id')
  removeTask(req: Request, res: Response) {}

  @get('/')
  getAll(req: Request, res: Response) {}
}

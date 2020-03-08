import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { MetadataKeys } from './MetadataKeys'
import { Methods } from './Methods'
import { RequestHandler, Request, Response, NextFunction } from 'express'

function bodyValidator(keys: string[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(400).send('Bad request')
      return
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(400).send(`Missing property ${key}`)
        return
      }
    }
    next()
  }
}

export function controller(routePrefix: string) {
  const router = AppRouter.getInstance()
  return (target: Function) => {
    for (const key in target.prototype) {
      const routeHandler = target.prototype[key]

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )

      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []

      const validator = bodyValidator(requiredBodyProps)

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        []

      if (path)
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        )
    }
  }
}

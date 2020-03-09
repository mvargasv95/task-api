import 'reflect-metadata'
import { RequestHandler } from 'express'
import { MetadataKeys } from './MetadataKeys'

export function use(middleware: RequestHandler) {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || []

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    )
  }
}

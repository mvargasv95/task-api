import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { MetadataKeys } from './MetadataKeys'
import { Methods } from './Methods'

export function controller(routePrefix: string) {
  const router = AppRouter.getInstance()
  // tslint:disable-next-line: ban-types
  return (target: Function) => {
    // tslint:disable-next-line: forin
    for (const key in target.prototype) {
      const routeHandler = target.prototype[key]

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )

      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)

      if (path) router[method](`${routePrefix}${path}`, routeHandler)
    }
  }
}

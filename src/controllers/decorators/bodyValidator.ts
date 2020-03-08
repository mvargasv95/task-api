import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'

export function bodyValidator(...keys: string[]) {
  return (target: any, key: string) => {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key)
  }
}

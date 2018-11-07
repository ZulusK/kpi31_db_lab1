import * as _ from 'lodash';

export function keysFromEnum<T>(src:any):T[] {
  return Object.keys(src).filter(f => _.isNumber(src[f] as any)) as any;
}

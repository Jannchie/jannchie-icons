import { rotate } from '../transform'
import flip, { fill as flipFill } from './flip'

// 上下翻转：flip 转 90°
export default opts => flip(opts).map(d => rotate(d, 90))

// 实心：flip 的实心版转 90°
export const fill = opts => flipFill(opts).map(p => (typeof p === 'string' ? rotate(p, 90) : { ...p, d: rotate(p.d, 90) }))

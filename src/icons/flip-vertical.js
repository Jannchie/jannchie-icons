import { rotate } from '../transform'
import flip from './flip'

// 上下翻转：flip 转 90°
export default opts => flip(opts).map(d => rotate(d, 90))

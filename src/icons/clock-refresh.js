import { mirror } from '../transform'
import base, { fill as baseFill } from './history'

// 时间刷新：history（逆时针）的左右镜像，箭头顺时针
export default opts => base(opts).map(d => mirror(d))

// 实心：history 实心版的左右镜像
const flip = p => (Array.isArray(p) ? p.map(flip) : typeof p === 'string' ? mirror(p) : { ...p, d: mirror(p.d) })
export const fill = opts => baseFill(opts).map(flip)

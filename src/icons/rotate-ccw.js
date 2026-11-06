import { mirror } from '../transform'
import base, { fill as baseFill } from './rotate'

// 逆时针旋转：rotate 的左右镜像
export default opts => base(opts).map(d => mirror(d))

// 实心：rotate 的实心版左右镜像
export const fill = opts => baseFill(opts).map(p => (typeof p === 'string' ? mirror(p) : { ...p, d: mirror(p.d) }))

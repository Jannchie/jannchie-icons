import { off, offFill } from '../off'
import base, { fill as baseFill } from './phone'

// 关闭 / 划掉
export default off(base)
export const fill = offFill(baseFill)

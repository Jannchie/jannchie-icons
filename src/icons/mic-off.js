import { off, offFill } from '../off'
import base, { fill as baseFill } from './mic'

// 关闭 / 划掉
export default off(base)
export const fill = offFill(baseFill)

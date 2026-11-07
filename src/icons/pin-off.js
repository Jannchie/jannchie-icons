import { off, offFill } from '../off'
import base, { fill as baseFill } from './pin'

// 取消固定
export default off(base)
export const fill = offFill(baseFill)

import { off, offFill } from '../off'
import base, { fill as baseFill } from './flag'

// 取消旗标
export default off(base)
export const fill = offFill(baseFill)

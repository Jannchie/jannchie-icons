import { off, offFill } from '../off'
import base, { fill as baseFill } from './clock'

// 无时钟
export default off(base)
export const fill = offFill(baseFill)

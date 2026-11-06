import { off, offFill } from '../off'
import base, { fill as baseFill } from './puzzle'

// 无拼图（模组）
export default off(base)
export const fill = offFill(baseFill)

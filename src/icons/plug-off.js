import { off, offFill } from '../off'
import base, { fill as baseFill } from './plug'

// 无插头
export default off(base)
export const fill = offFill(baseFill)

import { off, offFill } from '../off'
import base, { fill as baseFill } from './eye'

// 不可见
export default off(base)
export const fill = offFill(baseFill)

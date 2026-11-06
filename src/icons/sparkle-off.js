import { off, offFill } from '../off'
import base, { fill as baseFill } from './sparkle'

// 无星芒
export default off(base)
export const fill = offFill(baseFill)

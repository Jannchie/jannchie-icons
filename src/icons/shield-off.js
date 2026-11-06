import { off, offFill } from '../off'
import base, { fill as baseFill } from './shield'

// 无盾
export default off(base)
export const fill = offFill(baseFill)

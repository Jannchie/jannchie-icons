import { off, offFill } from '../off'
import base, { fill as baseFill } from './briefcase'

// 无公文包
export default off(base)
export const fill = offFill(baseFill)

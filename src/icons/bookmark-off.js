import { off, offFill } from '../off'
import base, { fill as baseFill } from './bookmark'

// 无书签
export default off(base)
export const fill = offFill(baseFill)

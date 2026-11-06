import { off, offFill } from '../off'
import base, { fill as baseFill } from './home'

// 划掉的住宅
export default off(base)
export const fill = offFill(baseFill)

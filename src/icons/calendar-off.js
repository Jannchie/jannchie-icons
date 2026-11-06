import { off, offFill } from '../off'
import base, { fill as baseFill } from './calendar'

// 无日历
export default off(base)
export const fill = offFill(baseFill)

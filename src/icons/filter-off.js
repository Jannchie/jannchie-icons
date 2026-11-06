import { off, offFill } from '../off'
import base, { fill as baseFill } from './filter'

// 无筛选
export default off(base)
export const fill = offFill(baseFill)

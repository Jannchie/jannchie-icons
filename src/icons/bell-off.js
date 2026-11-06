import { off, offFill } from '../off'
import base, { fill as baseFill } from './bell'

// 静音通知
export default off(base)
export const fill = offFill(baseFill)

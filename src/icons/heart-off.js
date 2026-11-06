import { off, offFill } from '../off'
import base, { fill as baseFill } from './heart'

// 取消喜欢
export default off(base)
export const fill = offFill(baseFill)

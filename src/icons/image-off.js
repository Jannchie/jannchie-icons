import { off, offFill } from '../off'
import base, { fill as baseFill } from './image'

// 无图片
export default off(base)
export const fill = offFill(baseFill)

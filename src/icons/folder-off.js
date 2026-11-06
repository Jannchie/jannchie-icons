import { off, offFill } from '../off'
import base, { fill as baseFill } from './folder'

// 无文件夹
export default off(base)
export const fill = offFill(baseFill)

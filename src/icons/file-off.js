import { off, offFill } from '../off'
import base, { fill as baseFill } from './file'

// 无文件
export default off(base)
export const fill = offFill(baseFill)

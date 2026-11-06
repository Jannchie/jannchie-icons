import { off, offFill } from '../off'
import base, { fill as baseFill } from './monitor'

// 关闭显示器
export default off(base)
export const fill = offFill(baseFill)

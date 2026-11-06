import { off, offFill } from '../off'
import base, { fill as baseFill } from './chat'

// 无对话
export default off(base)
export const fill = offFill(baseFill)

import { off, offFill } from '../off'
import base, { fill as baseFill } from './mail'

// 无邮件
export default off(base)
export const fill = offFill(baseFill)

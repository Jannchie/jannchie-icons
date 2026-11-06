import { off, offFill } from '../off'
import base, { fill as baseFill } from './cloud'

// 无云
export default off(base)
export const fill = offFill(baseFill)

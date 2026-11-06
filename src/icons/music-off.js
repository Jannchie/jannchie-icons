import { off, offFill } from '../off'
import base, { fill as baseFill } from './music'

// 无音乐
export default off(base)
export const fill = offFill(baseFill)

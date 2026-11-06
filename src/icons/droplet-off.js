import { off, offFill } from '../off'
import base, { fill as baseFill } from './droplet'

// 无水滴（干燥、减少降水）
export default off(base)
export const fill = offFill(baseFill)

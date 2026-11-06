import { off, offFill } from '../off'
import base, { fill as baseFill } from './star'

// 无收藏
export default off(base)
export const fill = offFill(baseFill)

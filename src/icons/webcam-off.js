import { off, offFill } from '../off'
import base, { fill as baseFill } from './webcam'

// 摄像头关闭
export default off(base)
export const fill = offFill(baseFill)

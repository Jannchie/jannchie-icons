import { LEFT_TRACES, RIGHT_TRACES } from '../brain-circuit'
import { brainFill, MIDLINE, outline } from './brain'

// 机械脑：大脑轮廓 + 中间脑沟 + 两侧电路走线
export default () => [outline(), MIDLINE, ...LEFT_TRACES, ...RIGHT_TRACES]

// 实心：脑叶一块，挖掉脑沟和走线（焊点圈挖掉、中心留成实心）
export const fill = () => brainFill([...LEFT_TRACES, ...RIGHT_TRACES])

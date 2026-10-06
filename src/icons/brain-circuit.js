import { LEFT_TRACES, RIGHT_TRACES } from '../brain-circuit'
import { MIDLINE, outline } from './brain'

// 机械脑：大脑轮廓 + 中间脑沟 + 两侧电路走线
export default () => [outline(), MIDLINE, ...LEFT_TRACES, ...RIGHT_TRACES]

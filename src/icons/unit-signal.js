import { UNIT, unitFrame } from '../unit'

// 兵牌：通信
export default ({ radius }) => [unitFrame(radius), ...UNIT['signal'].paths(radius)]

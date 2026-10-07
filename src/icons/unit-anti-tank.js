import { UNIT, unitFrame } from '../unit'

// 兵牌：反坦克
export default ({ radius }) => [unitFrame(radius), ...UNIT['anti-tank'].paths(radius)]

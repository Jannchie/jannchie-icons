import { UNIT, unitFrame } from '../unit'

// 兵牌：导弹
export default ({ radius }) => [unitFrame(radius), ...UNIT['missile'].paths(radius)]

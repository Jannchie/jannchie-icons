import { UNIT, unitFrame } from '../unit'

// 兵牌：防空
export default ({ radius }) => [unitFrame(radius), ...UNIT['air-defense'].paths(radius)]

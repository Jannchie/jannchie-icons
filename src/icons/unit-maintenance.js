import { UNIT, unitFrame } from '../unit'

// 兵牌：维修
export default ({ radius }) => [unitFrame(radius), ...UNIT['maintenance'].paths(radius)]

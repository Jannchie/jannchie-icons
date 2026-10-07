import { UNIT, unitFrame } from '../unit'

// 兵牌：医疗
export default ({ radius }) => [unitFrame(radius), ...UNIT['medical'].paths(radius)]

import { UNIT, unitFrame } from '../unit'

// 兵牌：宪兵
export default ({ radius }) => [unitFrame(radius), ...UNIT['military-police'].paths(radius)]

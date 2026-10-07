import { UNIT, unitFrame } from '../unit'

// 兵牌：工兵
export default ({ radius }) => [unitFrame(radius), ...UNIT['engineer'].paths(radius)]

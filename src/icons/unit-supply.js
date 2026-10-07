import { UNIT, unitFrame } from '../unit'

// 兵牌：补给
export default ({ radius }) => [unitFrame(radius), ...UNIT['supply'].paths(radius)]

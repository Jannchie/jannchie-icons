import { UNIT, unitFrame } from '../unit'

// 兵牌：装甲
export default ({ radius }) => [unitFrame(radius), ...UNIT['armor'].paths(radius)]

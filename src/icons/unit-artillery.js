import { UNIT, unitFrame } from '../unit'

// 兵牌：炮兵
export default ({ radius }) => [unitFrame(radius), ...UNIT['artillery'].paths(radius)]

import { UNIT, unitFrame } from '../unit'

// 兵牌：迫击炮
export default ({ radius }) => [unitFrame(radius), ...UNIT['mortar'].paths(radius)]

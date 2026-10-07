import { UNIT, unitFrame } from '../unit'

// 兵牌：指挥部
export default ({ radius }) => [unitFrame(radius), ...UNIT['headquarters'].paths(radius)]

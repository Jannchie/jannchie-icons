import { UNIT, unitFrame } from '../unit'

// 兵牌：空降步兵
export default ({ radius }) => [unitFrame(radius), ...UNIT['airborne'].paths(radius)]

import { UNIT, unitFrame } from '../unit'

// 兵牌：步兵
export default ({ radius }) => [unitFrame(radius), ...UNIT['infantry'].paths(radius)]

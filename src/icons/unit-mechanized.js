import { UNIT, unitFrame } from '../unit'

// 兵牌：机械化步兵
export default ({ radius }) => [unitFrame(radius), ...UNIT['mechanized'].paths(radius)]

import { UNIT, unitFrame } from '../unit'

// 兵牌：特种部队
export default ({ radius }) => [unitFrame(radius), ...UNIT['special-forces'].paths(radius)]

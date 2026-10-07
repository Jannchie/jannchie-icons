import { UNIT, unitFrame } from '../unit'

// 兵牌：山地步兵
export default ({ radius }) => [unitFrame(radius), ...UNIT['mountain'].paths(radius)]

import { UNIT, unitFrame } from '../unit'

// 兵牌：陆航（直升机）
export default ({ radius }) => [unitFrame(radius), ...UNIT['aviation'].paths(radius)]

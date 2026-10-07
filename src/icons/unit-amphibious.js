import { UNIT, unitFrame } from '../unit'

// 兵牌：两栖
export default ({ radius }) => [unitFrame(radius), ...UNIT['amphibious'].paths(radius)]

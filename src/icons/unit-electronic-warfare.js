import { UNIT, unitFrame } from '../unit'

// 兵牌：电子战
export default ({ radius }) => [unitFrame(radius), ...UNIT['electronic-warfare'].paths(radius)]

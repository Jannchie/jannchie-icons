import { UNIT, unitFrame } from '../unit'

// 兵牌：运输
export default ({ radius }) => [unitFrame(radius), ...UNIT['transport'].paths(radius)]

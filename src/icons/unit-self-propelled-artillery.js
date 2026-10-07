import { UNIT, unitFrame } from '../unit'

// 兵牌：自行火炮
export default ({ radius }) => [unitFrame(radius), ...UNIT['self-propelled-artillery'].paths(radius)]

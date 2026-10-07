import { UNIT, unitFrame } from '../unit'

// 兵牌：侦察
export default ({ radius }) => [unitFrame(radius), ...UNIT['recon'].paths(radius)]

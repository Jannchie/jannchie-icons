import { UNIT, unitFrame } from '../unit'

// 兵牌：装甲侦察
export default ({ radius }) => [unitFrame(radius), ...UNIT['armored-recon'].paths(radius)]

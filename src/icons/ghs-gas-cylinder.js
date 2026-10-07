import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS04 压缩气体
export default ({ radius }) => [ghsFrame(radius), ...GHS['gas-cylinder'].paths(radius)]

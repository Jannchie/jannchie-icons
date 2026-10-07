import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS09 环境危害
export default ({ radius }) => [ghsFrame(radius), ...GHS['environment'].paths(radius)]

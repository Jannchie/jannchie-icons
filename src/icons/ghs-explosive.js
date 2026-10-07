import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS01 爆炸物
export default ({ radius }) => [ghsFrame(radius), ...GHS['explosive'].paths(radius)]

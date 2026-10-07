import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS03 氧化性
export default ({ radius }) => [ghsFrame(radius), ...GHS['oxidizing'].paths(radius)]

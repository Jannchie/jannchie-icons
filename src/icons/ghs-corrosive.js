import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS05 腐蚀性
export default ({ radius }) => [ghsFrame(radius), ...GHS['corrosive'].paths(radius)]

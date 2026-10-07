import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS08 健康危害
export default ({ radius }) => [ghsFrame(radius), ...GHS['health-hazard'].paths(radius)]

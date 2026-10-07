import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS06 急性毒性
export default ({ radius }) => [ghsFrame(radius), ...GHS['toxic'].paths(radius)]

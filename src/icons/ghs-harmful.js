import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS07 有害
export default ({ radius }) => [ghsFrame(radius), ...GHS['harmful'].paths(radius)]

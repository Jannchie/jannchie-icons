import { GHS, ghsFrame } from '../ghs'

// GHS 危险品象形图：GHS02 易燃
export default ({ radius }) => [ghsFrame(radius), ...GHS['flammable'].paths(radius)]

import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心腐蚀
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['corrosive'].paths(radius)]

import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心烫伤
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['hot'].paths(radius)]

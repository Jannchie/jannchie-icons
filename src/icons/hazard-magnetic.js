import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心磁场
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['magnetic'].paths(radius)]

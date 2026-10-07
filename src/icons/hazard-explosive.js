import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心爆炸
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['explosive'].paths(radius)]

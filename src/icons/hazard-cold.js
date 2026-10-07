import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心低温
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['cold'].paths(radius)]

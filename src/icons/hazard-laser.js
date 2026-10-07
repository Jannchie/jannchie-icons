import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心激光
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['laser'].paths(radius)]

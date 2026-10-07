import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心触电
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['electric'].paths(radius)]

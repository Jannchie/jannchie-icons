import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心感染
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['biohazard'].paths(radius)]

import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心火灾
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['flammable'].paths(radius)]

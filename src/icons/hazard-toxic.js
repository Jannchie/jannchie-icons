import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心中毒
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['toxic'].paths(radius)]

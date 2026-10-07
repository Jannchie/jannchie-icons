import { HAZARD, hazardFrame } from '../hazard'

// 警告标志：当心电离辐射
export default ({ radius }) => [hazardFrame(radius), ...HAZARD['radiation'].paths(radius)]

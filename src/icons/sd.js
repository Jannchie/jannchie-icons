import { quality, QUALITIES } from '../quality'

// 画质标识：SD
export default ({ radius }) => quality(QUALITIES['sd'].text, radius)

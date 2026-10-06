import { quality, QUALITIES } from '../quality'

// 画质标识：FHD
export default ({ radius }) => quality(QUALITIES['fhd'].text, radius)

import { quality, QUALITIES } from '../quality'

// 画质标识：HDR
export default ({ radius }) => quality(QUALITIES['hdr'].text, radius)

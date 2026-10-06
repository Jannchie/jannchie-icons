import { quality, QUALITIES } from '../quality'

// 画质标识：UHD
export default ({ radius }) => quality(QUALITIES['uhd'].text, radius)

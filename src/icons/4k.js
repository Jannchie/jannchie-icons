import { quality, QUALITIES } from '../quality'

// 画质标识：4K
export default ({ radius }) => quality(QUALITIES['4k'].text, radius)

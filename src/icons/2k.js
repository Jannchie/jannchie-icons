import { quality, QUALITIES } from '../quality'

// 画质标识：2K
export default ({ radius }) => quality(QUALITIES['2k'].text, radius)

import { quality, QUALITIES } from '../quality'

// 画质标识：8K
export default ({ radius }) => quality(QUALITIES['8k'].text, radius)

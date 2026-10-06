import { quality, QUALITIES } from '../quality'

// 画质标识：BD
export default ({ radius }) => quality(QUALITIES['blu-ray'].text, radius)

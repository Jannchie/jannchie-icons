import { quality, QUALITIES } from '../quality'

// 画质标识：HD
export default ({ radius }) => quality(QUALITIES['hd'].text, radius)

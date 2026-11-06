import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：HD
export default ({ radius }) => quality(QUALITIES['hd'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['hd'].text, radius)

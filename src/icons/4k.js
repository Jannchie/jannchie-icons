import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：4K
export default ({ radius }) => quality(QUALITIES['4k'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['4k'].text, radius)

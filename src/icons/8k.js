import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：8K
export default ({ radius }) => quality(QUALITIES['8k'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['8k'].text, radius)

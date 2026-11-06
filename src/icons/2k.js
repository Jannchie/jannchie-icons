import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：2K
export default ({ radius }) => quality(QUALITIES['2k'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['2k'].text, radius)

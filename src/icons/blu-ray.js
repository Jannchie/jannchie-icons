import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：BD
export default ({ radius }) => quality(QUALITIES['blu-ray'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['blu-ray'].text, radius)

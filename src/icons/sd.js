import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：SD
export default ({ radius }) => quality(QUALITIES['sd'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['sd'].text, radius)

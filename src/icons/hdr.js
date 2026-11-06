import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：HDR
export default ({ radius }) => quality(QUALITIES['hdr'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['hdr'].text, radius)

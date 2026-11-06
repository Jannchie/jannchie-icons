import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：FHD
export default ({ radius }) => quality(QUALITIES['fhd'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['fhd'].text, radius)

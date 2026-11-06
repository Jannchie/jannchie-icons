import { QUALITIES, quality, qualityFill } from '../quality'

// 画质标识：UHD
export default ({ radius }) => quality(QUALITIES['uhd'].text, radius)

export const fill = ({ radius }) => qualityFill(QUALITIES['uhd'].text, radius)

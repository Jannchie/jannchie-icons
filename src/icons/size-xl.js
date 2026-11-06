import { quality, qualityFill } from '../quality'

// 尺码 XL：外框沿用画质标识
export default ({ radius }) => quality('XL', radius)

export const fill = ({ radius }) => qualityFill('XL', radius)

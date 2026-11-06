import { quality, qualityFill } from '../quality'

// 尺码 L：外框沿用画质标识
export default ({ radius }) => quality('L', radius)

export const fill = ({ radius }) => qualityFill('L', radius)

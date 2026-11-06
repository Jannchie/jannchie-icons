import { quality, qualityFill } from '../quality'

// 尺码 S：外框沿用画质标识
export default ({ radius }) => quality('S', radius)

export const fill = ({ radius }) => qualityFill('S', radius)

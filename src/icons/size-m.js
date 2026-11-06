import { quality, qualityFill } from '../quality'

// 尺码 M：外框沿用画质标识
export default ({ radius }) => quality('M', radius)

export const fill = ({ radius }) => qualityFill('M', radius)

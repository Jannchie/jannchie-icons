import { quality, qualityFill } from '../quality'

// 尺码 XS：外框沿用画质标识
export default ({ radius }) => quality('XS', radius)

export const fill = ({ radius }) => qualityFill('XS', radius)

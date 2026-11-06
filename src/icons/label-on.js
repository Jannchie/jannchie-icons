import { quality, qualityFill } from '../quality'

// 文字标签：ON（和画质标识同一套外框和线条字母）
export default ({ radius }) => quality('ON', radius)

export const fill = ({ radius }) => qualityFill('ON', radius)

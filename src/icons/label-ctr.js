import { quality, qualityFill } from '../quality'

// 文字标签：CTR，外包 / 合同工（Contractor）（和画质标识同一套外框和线条字母）
export default ({ radius }) => quality('CTR', radius)

export const fill = ({ radius }) => qualityFill('CTR', radius)

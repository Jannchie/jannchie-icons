import { quality, qualityFill } from '../quality'

// GIF 动图标记：和画质标识（hd、hdr）同一套横向圆角外框 + 框里切角线条字母 GIF
// 不画纸张：带纸的是文件格式 file-type-gif；这个是界面上插入动图、动图贴纸按钮的那个标签
export default ({ radius }) => quality('GIF', radius)

// 实心：外框一块，字母挖空
export const fill = ({ radius }) => qualityFill('GIF', radius)

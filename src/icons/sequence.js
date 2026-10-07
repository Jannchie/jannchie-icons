import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 顺序播放：三行列表 + 右边一支贯穿上下的向下箭头（按顺序一首接一首往下放）
// 和 repeat / shuffle 同一个高度（6.5–17.5 的上下边界外扩到 4.5–19.5），行线对齐列表系列的行距 6：5.5 / 11.5 / 17.5，
// 最后一行短一些，给箭头留出呼吸；箭头竖杆在 19.5，箭头 2.5（同 repeat）
export default ({ radius }) => [
  'M3.5 5.5H14.5',
  'M3.5 11.5H14.5',
  'M3.5 17.5H10.5',
  'M19.5 4.5V19.5',
  rounded(arrow(19.5, 19.5, 'down'), crisp(radius), false),
]

import { sparkle } from '../symbols'

// AI 星芒：大星芒 + 右上角小星芒，两者拉开距离（小尺寸下靠得太近会连成一片，像没闭合），整体按外框居中
// 小星芒缩放不到 DETAIL_SCALE，按细节画（线宽是外框的 0.8 倍）：用外框线宽的话粗字重下中间的空心被填满，成了一团实心
export default ({ radius }) => [
  ...sparkle([9, 14.75], 1.85, radius),
  ...sparkle([17.5, 6.5], 1.15, radius),
]

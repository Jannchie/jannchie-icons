import { sparkle } from '../symbols'

// AI 星芒：大星芒 + 右上角小星芒，两者拉开距离（小尺寸下靠得太近会连成一片，像没闭合），整体按外框居中
// 小星芒缩放不到 DETAIL_SCALE 会被当成细节封顶线宽，这里它是主体的一部分，去掉细节标记
export default ({ radius }) => [
  ...sparkle([9, 14.75], 1.85, radius),
  ...sparkle([17.5, 6.5], 1.15, radius).map(p => p.d ?? p),
]

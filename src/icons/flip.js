import { rounded } from '../geometry'

// 翻转：中间竖线 + 两侧对称、尖端朝中线的等腰直角三角形（尖角 90°，另外两个角 45°）
// 不画成细高的直角三角形：那样顶角只有约 27°，粗字重下内部被线宽填满，成了两块实心
export default ({ radius }) => [
  'M12 3V21',
  rounded([[4, 6], [10, 12], [4, 18]], Math.min(radius, 1)),
  rounded([[20, 6], [14, 12], [20, 18]], Math.min(radius, 1)),
]

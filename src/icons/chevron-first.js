import { chevronLeft } from '../symbols'

// 到最前：和 chevron-left 同尺寸的折角（尖端 11.2）+ 左侧竖线 6.5（落在 .5 上，高度 5.5–18.5 和折角的上下端齐）
// 折角尖和竖线隔 4.7，整体（6.5–17.8）按外框居中
export default ({ radius }) => [
  'M6.5 5.5V18.5',
  ...chevronLeft([14.5, 12], 2.2, radius),
]

import { chevronLeft } from '../symbols'

// 双左箭头（无杆）：两个和 chevron-left 同尺寸的折角（k = 2.2，深 6.6、高 13.2），前后错开 6；
// 两条平行斜边的垂直间距 6/√2 ≈ 4.2，粗字重下也分得开；整体按外框居中
export default ({ radius }) => [
  ...chevronLeft([9, 12], 2.2, radius),
  ...chevronLeft([15, 12], 2.2, radius),
]

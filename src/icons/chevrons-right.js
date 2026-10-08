import { chevronRight } from '../symbols'

// 双右箭头（无杆）：chevrons-left 的镜像，两个 chevron-right 同尺寸的折角前后错开 6
export default ({ radius }) => [
  ...chevronRight([9, 12], 2.2, radius),
  ...chevronRight([15, 12], 2.2, radius),
]

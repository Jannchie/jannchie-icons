import { chevronRight } from '../symbols'

// 到最后：chevron-first 的镜像——同尺寸的右折角 + 右侧竖线 17.5
export default ({ radius }) => [
  'M17.5 5.5V18.5',
  ...chevronRight([9.5, 12], 2.2, radius),
]

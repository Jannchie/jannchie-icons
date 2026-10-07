import { crisp, rounded } from '../geometry'

// 向前删除 ⌦：退格的镜像，尖头朝右
export default ({ radius }) => [
  rounded([[21.5, 12, crisp(radius)], [16, 17.5], [3.5, 17.5], [3.5, 6.5], [16, 6.5]], Math.min(radius, 2)),
  'M7.5 9.5L12.5 14.5M12.5 9.5L7.5 14.5',
]

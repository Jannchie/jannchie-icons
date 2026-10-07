import { rounded } from '../geometry'

// 六边形：尖顶朝上；左右竖边落在 3.5 / 20.5 上（略扁于正六边形，竖边 9.5、斜边约 9.7）
export default ({ radius }) => [
  rounded([[12, 2.5], [20.5, 7.25], [20.5, 16.75], [12, 21.5], [3.5, 16.75], [3.5, 7.25]], Math.min(radius, 2)),
]

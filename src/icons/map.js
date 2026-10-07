import { circle, crisp, rounded } from '../geometry'

// 地图：三折的折页 + 两道折痕；竖边都落在 .5 上（三折宽 6 / 5 / 6）
export default ({ radius, stroke }) => [
  rounded([[3.5, 6], [9.5, 3.5], [14.5, 6], [20.5, 3.5], [20.5, 18], [14.5, 20.5], [9.5, 18], [3.5, 20.5]], Math.min(radius, 1)),
  'M9.5 3.5V18',
  'M14.5 6V20.5',
]

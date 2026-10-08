import { crisp, rounded } from '../geometry'

// 上移一层：上下两层是线（4.5 / 19.5），选中的那层在中间是框（8.5–15.5），框里一个朝上的 V 表示挪动方向
// （和 arrange-bring-to-front / arrange-send-to-back 的「框 + 线」同一套画法）
export default ({ radius }) => [
  'M4.5 4.5H19.5',
  rounded([[4.5, 8.5], [19.5, 8.5], [19.5, 15.5], [4.5, 15.5]], Math.min(radius, 1.5)),
  'M4.5 19.5H19.5',
  rounded([[9.5, 13.5], [12, 11], [14.5, 13.5]], crisp(radius), false),
]

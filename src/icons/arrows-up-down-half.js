import { crisp, rounded } from '../geometry'

// 上下交换（简化）：两根竖杆各带一侧的半个箭头——左杆向上、箭羽只朝左；右杆向下、箭羽只朝右
// 整体绕画布中心 180° 对称；竖杆在 9.5 / 14.5，箭羽 45° 长 4（伸到 5.5 / 18.5）
export default ({ radius }) => [
  rounded([[9.5, 20.5], [9.5, 3.5], [5.5, 7.5]], crisp(radius), false),
  rounded([[14.5, 3.5], [14.5, 20.5], [18.5, 16.5]], crisp(radius), false),
]

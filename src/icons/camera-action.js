import { circle, rounded } from '../geometry'

// 运动相机：小而方的机身 + 左侧方形镜头框（框里一个镜片圆）+ 右上角小屏；底部两根固定脚
export default ({ radius }) => [
  rounded([[3.5, 5.5], [20.5, 5.5], [20.5, 16.5], [3.5, 16.5]], Math.min(radius, 2.5)),
  rounded([[5.5, 7.5], [12.5, 7.5], [12.5, 14.5], [5.5, 14.5]], Math.min(radius, 1.5)),
  circle(9, 11, 1.5),
  rounded([[15.5, 7.5], [18.5, 7.5], [18.5, 9.5], [15.5, 9.5]], Math.min(radius, 0.5)),
  'M9.5 16.5V19.5M14.5 16.5V19.5',
]

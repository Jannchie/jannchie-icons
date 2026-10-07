import { crisp, rounded } from '../geometry'

// 退格 ⌫：向左的尖头标签，里面一个叉；尖头不随全局圆角
export default ({ radius }) => [
  rounded([[2.5, 12, crisp(radius)], [8, 6.5], [20.5, 6.5], [20.5, 17.5], [8, 17.5]], Math.min(radius, 2)),
  'M11.5 9.5L16.5 14.5M16.5 9.5L11.5 14.5',
]

import { rounded } from '../geometry'

// 色调曲线：方框 + 从左下到右上的 S 曲线（两端离方框留出空隙，不会伸出圆角）
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5)),
  'M6.5 17.5C9.5 17.5 9.5 12 12 12C14.5 12 14.5 6.5 17.5 6.5',
]

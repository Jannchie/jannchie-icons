import { circle, crisp, rounded } from '../geometry'

// 礼物：盒盖 + 盒身 + 竖丝带 + 顶上两个蝴蝶结圈
export default ({ radius, stroke }) => [
  // 丝带在中线 12 上
  rounded([[3, 7.5], [21, 7.5], [21, 11.5], [3, 11.5]], Math.min(radius, 1.5)),
  rounded([[5, 11.5], [5, 20.5], [19, 20.5], [19, 11.5]], Math.min(radius, 2), false),
  'M12 7.5V20.5',
  'M12 7.5C10.5 4 6.5 3.5 7 6C7.5 7.5 12 7.5 12 7.5',
  'M12 7.5C13.5 4 17.5 3.5 17 6C16.5 7.5 12 7.5 12 7.5',
]

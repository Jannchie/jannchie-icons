import { circle, crisp, rounded } from '../geometry'

// 礼物：盒盖 + 盒身 + 竖丝带 + 顶上两个蝴蝶结圈
export default ({ radius, stroke }) => [
  rounded([[3.5, 8], [20.5, 8], [20.5, 12], [3.5, 12]], Math.min(radius, 1.5)),
  rounded([[5, 12], [5, 20.5], [19, 20.5], [19, 12]], Math.min(radius, 2), false),
  'M12 8V20.5',
  'M12 8C10.5 4.5 6.5 4 7 6.5C7.5 8 12 8 12 8',
  'M12 8C13.5 4.5 17.5 4 17 6.5C16.5 8 12 8 12 8',
]

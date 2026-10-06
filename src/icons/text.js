import { rounded } from '../geometry'

// 文本：字母 T，横梁两端下折，竖杆底部一小段横脚
export default ({ radius }) => [
  rounded([[5, 7], [5, 4.5], [19, 4.5], [19, 7]], Math.min(radius, 1), false),
  'M12 4.5V19.5',
  'M9.5 19.5H14.5',
]

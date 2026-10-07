import { rounded } from '../geometry'

// 文本：字母 T，横梁两端下折，竖杆底部一小段横脚（竖杆落在 11.5，整体左移半格）
export default ({ radius }) => [
  rounded([[4.5, 7], [4.5, 4.5], [18.5, 4.5], [18.5, 7]], Math.min(radius, 1), false),
  'M11.5 4.5V19.5',
  'M9 19.5H14',
]

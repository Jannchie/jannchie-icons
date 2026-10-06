import { rounded } from '../geometry'

// 头戴式耳机：半圆头梁 + 两侧圆角耳罩（头梁接在耳罩外侧边上）
export default ({ radius }) => [
  'M3.5 15V12A8.5 8.5 0 0 1 20.5 12V15',
  rounded([[3.5, 13.5], [7.5, 13.5], [7.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5)),
  rounded([[16.5, 13.5], [20.5, 13.5], [20.5, 20.5], [16.5, 20.5]], Math.min(radius, 1.5)),
]

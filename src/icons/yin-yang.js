import { ring } from '../marks'
import { dot } from '../scene'

// 太极：圆环 + 中间 S 形分界（两段半圆）+ 上下两个小点
export default ({ radius }) => [
  ring(),
  'M12 3A4.5 4.5 0 0 1 12 12A4.5 4.5 0 0 0 12 21',
  dot(12, 7.5, 2.25),
  dot(12, 16.5, 2.25),
]

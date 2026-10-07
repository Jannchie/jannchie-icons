import { ring } from '../marks'
import { dot } from '../scene'

// 帮助：圆 + 问号（问号右移半格，竖笔落在 12.5 上）
export default ({ radius }) => [
  ring(),
  'M10 9.5A2.5 2.5 0 1 1 13.5 11.8C12.9 12.1 12.5 12.6 12.5 13.3V13.75',
  dot(12.5, 16.75),
]

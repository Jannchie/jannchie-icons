import { ring } from '../marks'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 帮助：圆 + 问号（问号竖笔落在中轴 12 上）
export default ({ radius }) => [
  ring(),
  'M9.5 9.5A2.5 2.5 0 1 1 13 11.8C12.4 12.1 12 12.6 12 13.3V13.75',
  dot(12, 16.75),
]

export const fill = () => [solid(ring()), knock(['M9.5 9.5A2.5 2.5 0 1 1 13 11.8C12.4 12.1 12 12.6 12 13.3V13.75', dot(12, 16.75)])]

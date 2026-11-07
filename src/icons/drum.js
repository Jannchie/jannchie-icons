import { GAP } from '../clearance'
import { clear, knock, solid } from '../solid'

// 小军鼓：椭圆鼓面 + 鼓身 + 三道竖向的鼓绳 + 两根交叉在上方的鼓棒
const face = 'M4 9A8 3 0 0 1 20 9A8 3 0 0 1 4 9Z'
export default ({ radius }) => [
  // 鼓身两侧在 4 / 20，三道鼓绳在 8 / 12 / 16，端点正好落在鼓面和鼓底的椭圆上
  face,
  'M4 9V16.5A8 3 0 0 0 20 16.5V9',
  'M8 11.598V19.098',
  'M12 12V19.5',
  'M16 11.598V19.098',
  'M10 7L5 2.5',
  'M14 7L19 2.5',
]

// 实心：鼓面是完整的椭圆一块；鼓身沿鼓面让出 GAP 的缝，三道鼓绳一直挖到底，鼓身分成四片；鼓棒照旧是线，停在鼓面的缝外
export const fill = () => [
  solid('M4 9V16.5A8 3 0 0 0 20 16.5V9A8 3 0 0 1 4 9Z'),
  knock(['M8 9V23', 'M12 9V23', 'M16 9V23']),
  'M10 7L5 2.5',
  'M14 7L19 2.5',
  clear(face, GAP),
  solid(face),
]

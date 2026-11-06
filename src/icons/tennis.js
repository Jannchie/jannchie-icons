import { ring } from '../marks'
import { knock, solid } from '../solid'

// 网球：圆 + 左右两道深深弯进来的弧形缝线
export default ({ radius }) => [
  ring(),
  'M4.25 7.5C8.75 9.5 8.75 14.5 4.25 16.5',
  'M19.75 7.5C15.25 9.5 15.25 14.5 19.75 16.5',
]

// 实心：球一块，挖掉两道缝线
export const fill = () => [
  solid(ring()),
  knock(['M4.25 7.5C8.75 9.5 8.75 14.5 4.25 16.5', 'M19.75 7.5C15.25 9.5 15.25 14.5 19.75 16.5']),
]

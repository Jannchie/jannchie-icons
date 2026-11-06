import { rounded } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 鱼：头朝左的梭形身体 + 三角尾巴 + 眼睛 + 鳃线
export default ({ radius }) => [
  'M3 12C5.5 8 9 6 12 6C14.5 6 16.5 8 18 12C16.5 16 14.5 18 12 18C9 18 5.5 16 3 12Z',
  rounded([[18, 12], [21.5, 8.5], [21.5, 15.5]], Math.min(radius, 1)),
  eye(7.5, 11),
  'M10.5 8.5C11.5 10.5 11.5 13.5 10.5 15.5',
]

// 实心：鱼身、尾巴各一块，眼睛和鳃线挖空
export const fill = ({ radius }) => [
  solid('M3 12C5.5 8 9 6 12 6C14.5 6 16.5 8 18 12C16.5 16 14.5 18 12 18C9 18 5.5 16 3 12Z'),
  solid(rounded([[18, 12], [21.5, 8.5], [21.5, 15.5]], Math.min(radius, 1))),
  knock([eye(7.5, 11), 'M10.5 8.5C11.5 10.5 11.5 13.5 10.5 15.5']),
]

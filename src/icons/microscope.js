import { crisp, rounded } from '../geometry'
import { rotate } from '../transform'

// 显微镜：斜放的镜筒 + 弯曲的镜臂 + 载物台 + 底座
export default ({ radius }) => [
  rotate(rounded([[9, 2.5], [12.5, 2.5], [12.5, 12], [9, 12]], Math.min(radius, 1)), -30, [10.75, 7.25]),
  'M14.25 11.5C17.5 12 19 14.5 19 17C19 18.75 18 20.25 16.5 21',
  'M7 15H14',
  'M5.5 21H18.5',
]

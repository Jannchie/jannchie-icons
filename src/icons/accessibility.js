import { ring } from '../marks'
import { dot } from '../scene'

// 无障碍（通用）：圆环里一个张开双臂的人，躯干在中轴上
export default ({ radius }) => [
  ring(),
  dot(12, 7.5, 2.5),
  'M7.5 10.5L12 11.5L16.5 10.5',
  'M12 11.5V14',
  'M12 14L9.5 17.5',
  'M12 14L14.5 17.5',
]

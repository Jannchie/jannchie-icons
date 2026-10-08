import { circle } from '../geometry'
import { dot } from '../scene'

// 电脑摄像头：圆形机身 + 中间镜头 + 镜头上方的指示灯 + 短杆 + 底座
export default () => [
  circle(12, 9.5, 7),
  circle(12, 9.5, 2.75),
  dot(12, 4.75, 1.5),
  'M12 16.5V20.5',
  'M7.5 20.5H16.5',
]

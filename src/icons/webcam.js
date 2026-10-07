import { circle } from '../geometry'
import { dot } from '../scene'

// 电脑摄像头：圆形机身 + 中间镜头 + 镜头上方的指示灯 + 短杆 + 底座；短杆落在 .5 上，整体偏左半格
export default () => [
  circle(11.5, 9.5, 7),
  circle(11.5, 9.5, 2.75),
  dot(11.5, 4.75, 1.5),
  'M11.5 16.5V20.5',
  'M7 20.5H16',
]

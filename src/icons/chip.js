import { rounded } from '../geometry'

// 芯片：外框 + 内框 + 四边各两根引脚
export default ({ radius }) => [
  rounded([[6, 6], [18, 6], [18, 18], [6, 18]], Math.min(radius, 1.5)),
  rounded([[9.5, 9.5], [14.5, 9.5], [14.5, 14.5], [9.5, 14.5]], Math.min(radius, 0.75)),
  'M9.5 3V6',
  'M14.5 3V6',
  'M9.5 18V21',
  'M14.5 18V21',
  'M3 9.5H6',
  'M3 14.5H6',
  'M18 9.5H21',
  'M18 14.5H21',
]

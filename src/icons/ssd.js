import { rounded } from '../geometry'

// 固态硬盘（M.2）：细长 PCB + 两颗颗粒 + 左端金手指 + 右端半圆螺丝口
export default ({ radius }) => [
  'M21.5 13.75A1.75 1.75 0 0 1 21.5 10.25',
  rounded([[2.5, 8], [21.5, 8], [21.5, 16], [2.5, 16]], Math.min(radius, 1)),
  rounded([[7.5, 10], [12, 10], [12, 14], [7.5, 14]], Math.min(radius, 0.5)),
  rounded([[13.5, 10], [18, 10], [18, 14], [13.5, 14]], Math.min(radius, 0.5)),
  'M2.5 10.5H5',
  'M2.5 13.5H5',
]

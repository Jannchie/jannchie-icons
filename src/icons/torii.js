import { GROUND, groundLine } from '../scene'

// 鸟居：最上一道笠木两端上翘，下面紧贴一道岛木，再往下一道贯，两根柱子从岛木落到地面
// 正中的额束是单根竖线，落不到 .5 上，省掉
export default () => [
  groundLine,
  'M2.5 3.5Q12 7.5 21.5 3.5',
  'M5 7.5H19',
  'M5.5 11.5H18.5',
  `M7.5 7.5V${GROUND}`,
  `M16.5 7.5V${GROUND}`,
]

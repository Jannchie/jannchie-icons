import { GROUND, groundLine } from '../scene'

// 鸟居：整体是「开」字形——最上面的笠木中段平直、两端上翘，两根柱子从笠木落到地面，
// 柱间高处一道贯，两端伸出柱外
const pillars = [6.5, 17.5]
const top = 4.5
const nuki = 9.5

export default () => [
  groundLine,
  `M2.5 3Q4 ${top} 6.5 ${top}H17.5Q20 ${top} 21.5 3`,
  `M4 ${nuki}H20`,
  ...pillars.map(x => `M${x} ${top}V${GROUND}`),
]

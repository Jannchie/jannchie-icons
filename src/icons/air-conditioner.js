import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 空调（壁挂机）：圆角的机身（2.5–21.5 × 4.5–13.5）+ 出风口的横线（10.5，两端垂直接在侧边上）；
// 下面三道吹出来的风（16.5–20.5，离机身底边 3），弯曲的竖向波浪，中间那道对着机身正中
const wind = x => `M${x} 16.5C${x - 1} 17.5 ${x + 1} 19 ${x} 20.5`
export default ({ radius }) => [
  rounded([[2.5, 4.5], [21.5, 4.5], [21.5, 13.5], [2.5, 13.5]], Math.min(radius, 2)),
  'M2.5 10.5H21.5',
  wind(7.5), wind(12), wind(16.5),
]

// 实心：机身一块，出风口横线挖空（两端各缩一个线宽，机身不被切成两半），风照旧是线
export const fill = ({ radius, stroke }) => [
  solid(rounded([[2.5, 4.5], [21.5, 4.5], [21.5, 13.5], [2.5, 13.5]], Math.min(radius, 2))),
  knock(`M${2.5 + stroke} 10.5H${21.5 - stroke}`),
  wind(7.5), wind(12), wind(16.5),
]

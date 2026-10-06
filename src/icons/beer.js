import { rounded } from '../geometry'

// 啤酒：杯身 + 杯口横线 + 把手 + 顶上的泡沫 + 杯身两道反光
export default ({ radius }) => [
  'M5 7A2.5 2.5 0 0 1 8.5 4A2.5 2.5 0 0 1 12.5 4A2.5 2.5 0 0 1 15 7',
  rounded([[5, 7], [5, 21], [15, 21], [15, 7]], Math.min(radius, 1.5), false),
  'M5 7H15',
  'M15 10H17.5A2 2 0 0 1 19.5 12V15A2 2 0 0 1 17.5 17H15',
  'M8.5 11V17.5',
  'M11.5 11V17.5',
]

import { info } from '../tone'
import phone from './phone'

// 去电：听筒 + 右上一支指向右上的箭头（箭杆从 (15.5, 8.5) 到 (20.5, 3.5)，箭头是直角折线，尖在 (20.5, 3.5)，横竖落在 .5 上）
export default () => [
  ...phone(),
  ...info(['M15.5 8.5L20.5 3.5', 'M16.5 3.5H20.5V7.5']),
]

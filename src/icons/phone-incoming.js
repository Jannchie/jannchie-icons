import { info } from '../tone'
import phone from './phone'

// 来电：听筒 + 右上一支指向左下的箭头（箭杆从 (20.5, 3.5) 到 (15.5, 8.5)，箭头是直角折线，尖在 (15.5, 8.5)，横竖落在 .5 上）
export default () => [
  ...phone(),
  ...info(['M20.5 3.5L15.5 8.5', 'M15.5 4.5V8.5H19.5']),
]

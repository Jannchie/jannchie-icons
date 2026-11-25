import { rotate, scale } from '../transform'
import hand from './hand'

// 挥手（打招呼、再见）：hand 缩到 0.8 倍、往左歪 15°，手两侧各一道表示晃动的短弧（左上、右下，斜对着）
// 都是线，没有实心版（同 hand）
export default opts => [
  ...hand(opts).map(d => rotate(scale(d, 0.8), -15, [12, 12.5])),
  'M3.25 9.75C3.25 7.5 4.25 5.5 6 4.25',
  'M20.75 14.25C20.75 16.5 19.75 18.5 18 19.75',
]
